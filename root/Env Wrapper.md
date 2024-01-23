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