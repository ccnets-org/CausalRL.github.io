<h1><div style="text-align: center;">CausalRL</div></h1>
<h2><div style="text-align: center;">A powerful and robust RL algorithm that allows for network customization and the ability to learn causal relationships.</div></h2>



![RL with Cooperative Network](https://github.com/ccnets-team/rl-tune/assets/95277008/e7a82edc-c6c4-43d5-b283-e521ada6a108)



# Introduction

	Causal RL is an innovative Reinforcement Learning framework that utilizes three networks: Actor, Critic, and Reverse Environment, to learn the causal relationships between states, actions, and values while maximizing cumulative rewards. This introduction provides detailed descriptions of the framework's key features to help users leverage the full potential of Causal RL.

# Basic Usage

```python
# main.ipynb
import torch
from utils.setting.env_settings import analyze_env
from rl_tune import RLTune

device = torch.device("cuda:0" if (torch.cuda.is_available() and ngpu > 0) else "cpu")

env_config, rl_params = analyze_env(env_name = "Humanoid-v4")

with RLTune(env_config, rl_params, device, use_graphics = False, use_print = False, use_wandb = True) as rl_tune:
    rl_tune.train(resume_training = False)
```

# 2. API

## 2-1 Class RLTune
```python
class RLTune:
    def __init__(self, env_config: EnvConfig, rl_params: RLParameters, device, use_graphics=False, use_print=False, use_wandb = False):
```
The RLTune class is designed for tuning and training reinforcement learning models, using a specified trainer.

### Parameters:
- `env_config` (EnvConfig): Configuration for the environment.
- `trainer` (Trainer): Trainer object for the reinforcement learning algorithm.
- `device` (Device): Computational device (e.g., CPU, GPU).
- `use_graphics` (bool, optional): Whether to use graphics during training/testing. Default is False.
- `use_print` (bool, optional): Whether to print training/testing logs. Default is False.

### Functions

- `__init__():`
	Accepts environment configuration (EnvConfig), RL parameters (RLParameters), computational device (device), and options for graphics, printing, and WandB integration.

- `_end_environments():`
If the environment exists, shut down both the training and testing environments of a reinforcement learning setup.

- `train():`
The main method of this class. To train the model based on the provided policy.
	
	- setup(training=True): To prepare the training environment using this method

- `test():`
To evaluate a reinforcement learning algorithm over specified of episodes(default: max_episode=100)
	- setup(training=False): To prepare the test environment using this method

- `_train_step_logic():`
The core method of the training process in a reinforcement learning environment.
	
	- `helper.init_step():` initializes the training/testing step
	- `process_test_environmemt():` to handle interactions with an environment and for test interactions(`if 'training' == False`), the trajectories are not pushed to memory, which is a step reserved for training interaction. 

- `_test_step_logic():`
The logic for each step during the testing phase of a reinforcement learning algorithm.

- `train_on_policy():`
To train a model using on-policy reinforcement learning algorithm.

	- `process_train_environment():` Interacts with the training environment and collect data based on the current policy.
	- `should_update_strategy():` check if strategy should be updated.
	- `_update_strategy_from_samples():` to enhance the strategy used in the training of a reinforcement learning.
	- `reset_memory_and_train():` reset the memory buffer and then performs a seies of training steps. It iterates over a predefined number of on-policy iterations(`train_step`) 

- `train_off_policy():`
To train a model using off-policy reinforcement learning alrorithm.

	- `process_train_environment():` Interacts with the training environment and collect data based on the current policy.
	- `should_update_strategy():` check if strategy should be updated.
	- `_update_strategy_from_samples():` to enhance the strategy used in the training of a reinforcement learning.
	- `train_step():` a single step of training in a reinforcement learning include Sample Trajectory, Model Training, TD Errors and Record Metrics 


- `interact_environment():` This function progresses the environmentstate, retrieves the resulting trajectories, and the records these trajectories using the helper.record method.


## 2-2 Class CausalRL
```python
class CausalRL(BaseTrainer):
	def __init__(self, env_config, rl_params, device):
```

This class is specialized trainer for reinforcement learning. It initailizes with environment configuration('env_config'), RLparameters('rl_params'), and the computational device('device').
And the class sets up three key networks: Critic, Actor, Reverse-Environment networks, each configured based on the provided RL parameters.

### Funtions
- `get_action()` method is responsible for determining the action to be taken by an agent in a given state. When `training == True`, it uses Actor's `sample_action` method else, it uses `select_action` method. 

- `train_model()` method is a core method of CausalRL approach. It involves a cooperative setup among three networks: Critic, Actor, Reverse-Environment, which learn from the environment's transitions. These method include computing various costs, errors, losses and these losses are used for backpropagation to adjust network parameters. 

- `backwards()` method  conducts backpropagation for multiple neural networks in a reinforcement learning framework, each targeting a specific part of the causal relationship graph. It first disables, then selectively enables gradients for each network during the error backpropagation process to ensure targeted learning. Finally, it resets the networks to allow gradient updates, preparing them for future forward passes.


## 2-3 Class RL Params

### class TrainingParameters
- `trainer_name`: Specifies the type of trainer algorithm. (default: `causal_rl`)
- `trainer_variant`: Specifies a variant of `CausalRL`. (default: `classic`)
- `use_on_policy`: Set whether the training is `on-policy` or `off-policy`. (default: `False`)
- `batch_size`: Number of samples processed before model update. Larger batch szie can lead to more stable but slower training. (batch size / samples per step, default: `64`)
- `replay_ratio`: Ratio foe how often past experiences are reused. (default: `1`)
- `train_interval`: Frequency of thraining updates. (default: `1`)


### class AlgorithmParameters
- `min_seq_length`: Minimum sequence length during exploration. (default: `1`)
- `max_seq_length`: Maximum sequence length for training and exploration. (default: `16`)
- `discount_factor`: To reduce the value of future rewards in the calculation of expected returns. (default: `0.99`)
- `advantage_lambda`: Weighting advantages in policy optimization. (default: `0.98`)
- `use_gae_advantage`: Automatically set in `rl_trainer`.py. It's determined based on weather the policy is off-policy or on-policy. (default: `None`)


### class NetworkParameters
- `critic_network`: Specifies the type of model-based network for the critic network
- `actor_network`: Specifies the type of model-based network for the actor network
- `rev_env_network`: Specifies the type of model-based network for the rev_env
- `critic_params`: Parameters for the critic network.
- `actor_params`: Parameters for the actor network.
- `rev_env_params`: Parameters for the rev-env network.
	
	
### class OptimizationParameters
- `lr`: Learning rate for the optimiztion algorithm. (default: `5e-5`)
- `lr_decay_ratio`: The ratio for learning rate decay throughout the training. (default: `2e-1`)
- `scheduler_type`: Specifies the type of learning rate scheduler. (default: `cyclic`)
- `tau`: How quickly the target network is updated with the main network's weights. (default: `1e-1`)
- `use_target_network`: Indicate whether to use target network or not. (default: `True`)
- `clip_grad_range`: The range within which gradients are clipped. To prevent the issue of exploding gradients. (default: `2.0`)


### class ExplorationParameters
- `noise_type`: Type of exploration noise used to encourage exploration in the agent. (default: `None`)
- `max_steps`: Maximum number of steps for the exploration phase. (default: `100000`) 


### class MemoryParameters. 
- `buffer_size`: Total size of the memory buffer, This determines the capacity for storing past experiences. (default: `256000`)
- `early_training_start_step`: An optional parameter that allows training to commence before the replay buffer is completely filled. (default: `None`)


### class NormalizationParameters
- `state_normalizer`: Determines the method used for normalizing state valeus. (default: `running_mean_std`)
- `reward_normalizer`: Determines the method used for normalizing reward values. (default: `exponential_moving_mean_var`)
- `advantage_normalizer`: Determines the method used for normalizing advantage values. (default: `exponential_moving_mean_var`)
- `exponential_moving_alpha`: Set the alpha value for exponential moving average calculations. (dafault: `1e-4`)
- `clip_norm_range`: The range within which normalized values are clipped. (default: `10.0`)


# 3. Env Wrapper
Env Wrapper Modules are a collection of modular components, each offering unique finctionality for reinforcement learning environmens. This modules includes a range of modules like `gym_wrapper`, `ml_agent_wrapper`, etc., designed to enhance and simplify the integration and customization of various RL platforms. 

## 3.1 Gym Wrapper
<div align="center">
    <img src="https://github.com/ccnets-team/rl-tune/assets/95277008/0b1ad841-da4b-4fb4-a171-a9781c875a38" alt="gymnasium-text" width="400"/>
</div>


```python
# gym_wrapper.py
class GymEnvWrapper(AgentExperienceCollector):
    def __init__(self, env_config, max_seq_length, test_env: bool, use_graphics: bool = False, seed: int = 0):
	...
```


```python
# main.ipynb
env_config, rl_params = analyze_env(env_name = "HalfCheetah-v4")
```
- While most of the environment and parameters are automatically configured based on the environment name set by the user, the primary parameters that users can manually set are as follows:

	- `use_graphics`: To monitor the model training process in real-time through video, Set `use_graphics = True`. (default: False)
	- `seed`:  To control the randomness in the environment, ensuring reproducibility by initializing the environment in the same way
	- `time_scale`: To  adjusts the simulation speed in the Unity environment, enabling faster or slower updates for efficient training or detailed observation.

To visit **Gymnasium Official Page** for more details, Click [here](https://gymnasium.farama.org/api/wrappers/).


## 3.2 Unity MLAgent Wrapper
<div align="center">
    <img src="https://github.com/ccnets-team/rl-tune/assets/95277008/ad0760d5-6f70-456f-802f-627cfcbfaa01" alt="unity-wide" width="600"/>
</div>

```python
# mlagents_wrapper.py
class MLAgentsEnvWrapper(AgentExperienceCollector):
    def __init__(self, env_config, max_seq_length, test_env, use_graphics: bool, worker_id, seed = 0, time_scale = 256):
	...
```

```python
# main.ipynb
env_config, rl_params = analyze_env(env_name = "3DBallHard")
```
- While most of the environment and parameters are automatically configured based on the environment name set by the user, the primary parameters that users can manually set are as follows:

	- `use_graphics`: To monitor the model training process in real-time through video, Set `use_graphics = True`. (default: False)
	- `seed`:  To control the randomness in the environment, ensuring reproducibility by initializing the environment in the same way
	- `time_scale`: To  adjusts the simulation speed in the Unity environment, enabling faster or slower updates for efficient training or detailed observation.

To visit **Unity MLAgent Official Page** for more details, Click [here](https://github.com/gzrjzcx/ML-agents/blob/master/gym-unity/README.md).

# 4. Tutorials
## 4.1 Day 1. MLAgent + MLP(Non-LM)
## 4.2 Day 2. MLAgent + LM
## 4.3 Day 3. OPenAI Gym + MLP(Non-LM)
## 4.4 Day 4. OPenAI Gym + LM


# 5. Development
## 5.1 Github
## 5.2 CausalRL Release Notes
