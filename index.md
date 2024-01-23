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

<!-- style -->
---

<div align="left">
  Copyright © 2024 CCNets
</div>

<!-- 마크다운 내용 -->

<style>
  .footer-links {
    /* position: fixed; */
    bottom: 10px;
    right: 10px;
    text-align: right;
  }
  .footer-links a {
    display: inline-block;
    margin-left: 10px;
  }
</style>

<div class="footer-links">
  <a href="https://ccnets.org/" target="_blank">
    <img src="https://github.com/ccnets-team/rl-tune/assets/95277008/42f10f53-0262-4203-9c6f-618e4841adb2" alt="Website" style="width: 20px; height: 20px;">
  </a>
  <a href="https://github.com/ccnets-team/rl-tune" target="_blank">
    <img src="https://github.com/ccnets-team/rl-tune/assets/95277008/5183f887-1263-408b-8c2f-9eeefafbce48" alt="GitHub" style="width: 20px; height: 20px;">
  </a>
  <a href="https://www.linkedin.com/company/ccnets/" target="_blank">
    <img src="https://github.com/ccnets-team/rl-tune/assets/95277008/fe1f76f2-a407-4f58-ad28-92a9ac9efa3f" alt="LinkedIn" style="width: 20px; height: 20px;">
  </a>
</div>

