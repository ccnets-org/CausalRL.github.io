# CAUSAL RL TUTORIAL - Basic

DELAWARE INCORPORATION
COPYRIGHT (c) 2024. CCNets, Inc. All Rights reserved.

Author:

JunHo PARK

JEONGYOONG KIM

<hr>

## Introduction

*이 튜토리얼은 **CCNets's causal-rl repository** `beta branch`에 기반하여 작성되었습니다.*

이번 튜토리얼에서는 **CausalRL**의 기본적인 사용방법과 `rl_config`의 Parameter 클래스들을 이용해 훈련에 사용할 parameter들을 튜닝하는 방법에 대해 알아보겠습니다. 먼저, 필요한 라이브러리와 모듈을 불러오겠습니다.

더 자세한 정보를 위해서 [CausalRL Readme.md](https://github.com/ccnets-team/causal-rl/blob/beta-causal-rl/README.md) 또는 [LinkedIn page of CCNets](https://www.linkedin.com/company/ccnets/posts/?feedView=all) 를 참고하세요.

## Dependency

```bash
conda create -name crl python=3.9.18
conda activate crl
conda install pytorch torchvision torchaudio pytorch-cuda=12.1 -c pytorch -c nvidia
pip install mlagents==0.30
pip install protobuf==3.20
pip install jupyter
pip install transformers==4.34.1
```

### Clone the repository:

```bash
git clone https://github.com/ccnets-team/causal-rl.git
```

## Import Library

```python
from __future__ import print_function
from utils.setting.env_settings import analyze_env
from utils.init import set_seed
from torch.utils.tensorboard import SummaryWriter
import torch

set_seed()
ngpu = 2 # 사용할 GPU의 수

device = torch.device("cuda:0" if (torch.cuda.is_available() and ngpu > 0) else "cpu")
```

- `set_seed()`: *random*, *numpy*, *torch*와 같은 다양한 라이브러리의 시드 값을 고정하여 무작위성을 제어함으로써, 실험을 안정적이고 재현 가능하게 만듭니다.

## Setting Up the Learning Environment

먼저, **MLAgent's 3DBallHard**을 튜토리얼에 사용하기 위해서, 아래와 같이 causal_rl 디렉토리 위치와 동일한 위치에 파일을 다운받고 압축을 풀어주세요.

    Unity MLAgents(download link: https://drive.google.com/pdrive/folders/1TGSfw7IgfmVZslvmqIDLr5jAneQpsVbb?usp=sharing):
        locate the downloaded folder as below:
        your_projects/
            causal_rl/
            unity_environments/


```python
env_config, rl_params = analyze_env(env_name = "3DBallHard")
```

- `analyze_env()` 함수는 `3DBallHard`라는 이름의 환경을 분석하고 설정합니다. 이 함수는 **CausalRL** 프레임워크의 핵심 함수 중 하나로, 사용자가 정의한 환경 이름(`env_name`)을 받아 필요한 환경 설정(`env_config`)과 학습 매개변수(`rl_params`)를 구성합니다. 여기서 "3DBallHard" 환경에 대한 구성과 매개변수를 추출하여, `env_config`와 `rl_params` 두 변수에 할당하는 과정을 수행합니다. 

## Set Parameters

```python
from utils.setting.rl_config import TrainingParameters, AlgorithmParameters, NetworkParameters
from nn.gpt import GPT

rl_params.training = TrainingParameters(batch_size=64, replay_ratio=1, max_steps=100000, buffer_size=256000)

rl_params.algorithm = AlgorithmParameters(gpt_seq_length=16, discount_factor=0.99)

rl_params.network =  NetworkParameters(num_layers=5, d_model=256, dropout=0.02, network_type=GPT)
```

- **TrainingParameters:**
    - `batch_size`: 
        
        *MLAgent와 Gymnasium 환경에서는 32 또는 64의 `batch_size`를 추천합니다. 또한, 메모리 최적화와 계산 효율을 위해 2의 배수값을 입력하는 것이 좋습니다*

    - `replay_ratio`: 
    
        훈련에서 과거 경험을 얼마나 자주 재사용하는지에 대한 비율입니다. *MLAgent와 Gymnasium 환경에서는 1, 2, 4의 `replay_ratio`를 추천합니다*
    
    - `max_steps`: 
    
        탐색 단계의 최대 수로, 탐색 전략이 적용되는 기간을 정의합니다. 일반적인 머신러닝 학습에서는 *`epochs`* 또는 *`iterations`* 로 표현합니다.
    
    - `buffer_size`: 
        
        메모리 버퍼의 총 크기로, 얼마나 많은 과거 경험을 저장할 수 있는지에 영향을 미칩니다.

    **위의 TrainingParameters의 각 parameter는 큰 값을 설정할수록 안정적인 학습이 가능할수도 있지만, 더 느린 훈련을 초래할 수 있습니다**

- **AlgorithmParameters:**
    - `gpt_seq_length`: 
    
        GPT 모델을 이용한 훈련 및 탐색에서 사용되는 최대 시퀀스 길이입니다. 훈련에 큰 영향을 미치는 parameter로 `gpt_seq_length`값이 크다면 더 긴 시퀀스를 처리할 수 있게 하여, 모델이 더욱 긴 *상태-행동 시퀀스*를 이해할 수 있게 되고 장기 의존성을 학습할 수 있도록 합니다. 하지만, 메모리 사용량이 증가하고, 높은 계산 복잡성으로 인해 훈련시간이 길어질 우려가 있습니다. 반면, 작은 `gpt_seq_length`값은 메모리 효율성이 개선되고 훈련 속도가 빨라질 수 있지만, 모델이 짧은 *상태-행동 시퀀스*만을 볼 수 있어 단기간의 정보를 기반으로 다음 결정을 내리게 됩니다. 
    
    - `discount_factor`: 
    
        미래 보상의 현재 가치를 결정하는 중요한 매개변수입니다. 미래 보상의 현재 가치라는 말은 강화학습에서 에이전트가 미래에 받을 보상을 현재 시점에서 얼마나 가치있게 평가하는지를 나타냅니다. 시간이 지남에 따라 받게 될 보상이 현재 시점에서는 더 낮은 가치를 가지게 되는데, 이를 수학적으로 조정하기 위해 할인율을 사용합니다. 따라서, `discount_factor`를 높게 설정한다면, 에이전트가 미래의 보상을 더 중시하여 장기적으로 이익이 되는 전략을 선호하게 됩니다. 반면, `discount_factor`를 낮게 설정한다면, 에이전트는 즉각적인 보상을 중시하게 됩니다. 그러므로, 학습하는 환경의 특성에 맞게 `discount_factor`를 조정하는 것은 에이전트의 의사결정 과정과 학습 안정화를 위해 중요합니다. 

- **NetworkParameters:**
    - `num_layer`: 
    
        네트워크의 레이어 수로, 모델의 깊이를 결정합니다. `num_layer`가 높을수록 모델이 깊어져 더욱 복잡한 패턴을 학습할 수 있지만, 과적합의 위험이 커지고, 계산 비용이 증가합니다.

    - `d_model`: 
    
        모델의 차원으로, 네트워크에서 처리하는 특성 벡터의 크기를 나타냅니다. `d_model`이 크면 모델이 표현할 수 있는 정보량이 증가하여 성능이 향상될 수 있으나, `num_layer`와 마찬가지로, 과적합 또는 메모리 사용량 증가의 문제가 발생할 수 있습니다.

    - `dropout`: 
    
        학습 중에 노드를 무작위로 생략하는 비율로, 과적합을 방지하는 데 도움이 됩니다. *MLAgent와 Gymnasium 환경에서는 0.01 ~ 0.03의 `dropout`을 추천합니다.*

    - `network_type`: 
    
        사용될 모델 기반 네트워크의 유형으로, 특정 모델을 지정할 수 있습니다.

## Training

```python
from causal_rl import CausalRL

with CausalRL(env_config, rl_params, device, use_print = False, use_wandb = True) as causal_rl:
    causal_rl.train(resume_training = False, use_eval = False, use_graphics = False)
    causal_rl.test(max_episodes = 100, use_graphics = False)
```