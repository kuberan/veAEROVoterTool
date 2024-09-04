import React, { useState } from 'react';
import { ethers } from 'ethers';
import './App.css';
import { Helmet } from 'react-helmet';

const contractAddress = '0x4c5d3925fe65DFeB5A079485136e4De09cb664A5';
const contractABI = [{"stateMutability":"nonpayable","type":"constructor","inputs":[{"name":"_voter","type":"address"},{"name":"_rewards_distributor","type":"address"},{"name":"_gov","type":"address"}],"outputs":[]},{"stateMutability":"view","type":"function","name":"all","inputs":[{"name":"_limit","type":"uint256"},{"name":"_offset","type":"uint256"}],"outputs":[{"name":"","type":"tuple[]","components":[{"name":"id","type":"uint256"},{"name":"account","type":"address"},{"name":"decimals","type":"uint8"},{"name":"amount","type":"uint128"},{"name":"voting_amount","type":"uint256"},{"name":"governance_amount","type":"uint256"},{"name":"rebase_amount","type":"uint256"},{"name":"expires_at","type":"uint256"},{"name":"voted_at","type":"uint256"},{"name":"votes","type":"tuple[]","components":[{"name":"lp","type":"address"},{"name":"weight","type":"uint256"}]},{"name":"token","type":"address"},{"name":"permanent","type":"bool"},{"name":"delegate_id","type":"uint256"},{"name":"managed_id","type":"uint256"}]}]},{"stateMutability":"view","type":"function","name":"byAccount","inputs":[{"name":"_account","type":"address"}],"outputs":[{"name":"","type":"tuple[]","components":[{"name":"id","type":"uint256"},{"name":"account","type":"address"},{"name":"decimals","type":"uint8"},{"name":"amount","type":"uint128"},{"name":"voting_amount","type":"uint256"},{"name":"governance_amount","type":"uint256"},{"name":"rebase_amount","type":"uint256"},{"name":"expires_at","type":"uint256"},{"name":"voted_at","type":"uint256"},{"name":"votes","type":"tuple[]","components":[{"name":"lp","type":"address"},{"name":"weight","type":"uint256"}]},{"name":"token","type":"address"},{"name":"permanent","type":"bool"},{"name":"delegate_id","type":"uint256"},{"name":"managed_id","type":"uint256"}]}]},{"stateMutability":"view","type":"function","name":"byId","inputs":[{"name":"_id","type":"uint256"}],"outputs":[{"name":"","type":"tuple","components":[{"name":"id","type":"uint256"},{"name":"account","type":"address"},{"name":"decimals","type":"uint8"},{"name":"amount","type":"uint128"},{"name":"voting_amount","type":"uint256"},{"name":"governance_amount","type":"uint256"},{"name":"rebase_amount","type":"uint256"},{"name":"expires_at","type":"uint256"},{"name":"voted_at","type":"uint256"},{"name":"votes","type":"tuple[]","components":[{"name":"lp","type":"address"},{"name":"weight","type":"uint256"}]},{"name":"token","type":"address"},{"name":"permanent","type":"bool"},{"name":"delegate_id","type":"uint256"},{"name":"managed_id","type":"uint256"}]}]},{"stateMutability":"view","type":"function","name":"voter","inputs":[],"outputs":[{"name":"","type":"address"}]},{"stateMutability":"view","type":"function","name":"token","inputs":[],"outputs":[{"name":"","type":"address"}]},{"stateMutability":"view","type":"function","name":"ve","inputs":[],"outputs":[{"name":"","type":"address"}]},{"stateMutability":"view","type":"function","name":"dist","inputs":[],"outputs":[{"name":"","type":"address"}]},{"stateMutability":"view","type":"function","name":"gov","inputs":[],"outputs":[{"name":"","type":"address"}]}];

const rewardsContractAddress = '0x68c19e13618c41158fe4baba1b8fb3a9c74bdb0a';
const rewardsContractABI = [{"stateMutability":"nonpayable","type":"constructor","inputs":[{"name":"_voter","type":"address"},{"name":"_registry","type":"address"},{"name":"_convertor","type":"address"},{"name":"_slipstream_helper","type":"address"}],"outputs":[]},{"stateMutability":"view","type":"function","name":"forSwaps","inputs":[{"name":"_limit","type":"uint256"},{"name":"_offset","type":"uint256"}],"outputs":[{"name":"","type":"tuple[]","components":[{"name":"lp","type":"address"},{"name":"type","type":"int24"},{"name":"token0","type":"address"},{"name":"token1","type":"address"},{"name":"factory","type":"address"},{"name":"pool_fee","type":"uint256"}]}]},{"stateMutability":"view","type":"function","name":"tokens","inputs":[{"name":"_limit","type":"uint256"},{"name":"_offset","type":"uint256"},{"name":"_account","type":"address"},{"name":"_addresses","type":"address[]"}],"outputs":[{"name":"","type":"tuple[]","components":[{"name":"token_address","type":"address"},{"name":"symbol","type":"string"},{"name":"decimals","type":"uint8"},{"name":"account_balance","type":"uint256"},{"name":"listed","type":"bool"}]}]},{"stateMutability":"view","type":"function","name":"all","inputs":[{"name":"_limit","type":"uint256"},{"name":"_offset","type":"uint256"}],"outputs":[{"name":"","type":"tuple[]","components":[{"name":"lp","type":"address"},{"name":"symbol","type":"string"},{"name":"decimals","type":"uint8"},{"name":"liquidity","type":"uint256"},{"name":"type","type":"int24"},{"name":"tick","type":"int24"},{"name":"sqrt_ratio","type":"uint160"},{"name":"token0","type":"address"},{"name":"reserve0","type":"uint256"},{"name":"staked0","type":"uint256"},{"name":"token1","type":"address"},{"name":"reserve1","type":"uint256"},{"name":"staked1","type":"uint256"},{"name":"gauge","type":"address"},{"name":"gauge_liquidity","type":"uint256"},{"name":"gauge_alive","type":"bool"},{"name":"fee","type":"address"},{"name":"bribe","type":"address"},{"name":"factory","type":"address"},{"name":"emissions","type":"uint256"},{"name":"emissions_token","type":"address"},{"name":"pool_fee","type":"uint256"},{"name":"unstaked_fee","type":"uint256"},{"name":"token0_fees","type":"uint256"},{"name":"token1_fees","type":"uint256"},{"name":"nfpm","type":"address"}]}]},{"stateMutability":"view","type":"function","name":"byIndex","inputs":[{"name":"_index","type":"uint256"}],"outputs":[{"name":"","type":"tuple","components":[{"name":"lp","type":"address"},{"name":"symbol","type":"string"},{"name":"decimals","type":"uint8"},{"name":"liquidity","type":"uint256"},{"name":"type","type":"int24"},{"name":"tick","type":"int24"},{"name":"sqrt_ratio","type":"uint160"},{"name":"token0","type":"address"},{"name":"reserve0","type":"uint256"},{"name":"staked0","type":"uint256"},{"name":"token1","type":"address"},{"name":"reserve1","type":"uint256"},{"name":"staked1","type":"uint256"},{"name":"gauge","type":"address"},{"name":"gauge_liquidity","type":"uint256"},{"name":"gauge_alive","type":"bool"},{"name":"fee","type":"address"},{"name":"bribe","type":"address"},{"name":"factory","type":"address"},{"name":"emissions","type":"uint256"},{"name":"emissions_token","type":"address"},{"name":"pool_fee","type":"uint256"},{"name":"unstaked_fee","type":"uint256"},{"name":"token0_fees","type":"uint256"},{"name":"token1_fees","type":"uint256"},{"name":"nfpm","type":"address"}]}]},{"stateMutability":"view","type":"function","name":"positions","inputs":[{"name":"_limit","type":"uint256"},{"name":"_offset","type":"uint256"},{"name":"_account","type":"address"}],"outputs":[{"name":"","type":"tuple[]","components":[{"name":"id","type":"uint256"},{"name":"lp","type":"address"},{"name":"liquidity","type":"uint256"},{"name":"staked","type":"uint256"},{"name":"amount0","type":"uint256"},{"name":"amount1","type":"uint256"},{"name":"staked0","type":"uint256"},{"name":"staked1","type":"uint256"},{"name":"unstaked_earned0","type":"uint256"},{"name":"unstaked_earned1","type":"uint256"},{"name":"emissions_earned","type":"uint256"},{"name":"tick_lower","type":"int24"},{"name":"tick_upper","type":"int24"},{"name":"sqrt_ratio_lower","type":"uint160"},{"name":"sqrt_ratio_upper","type":"uint160"}]}]},{"stateMutability":"view","type":"function","name":"positionsByFactory","inputs":[{"name":"_limit","type":"uint256"},{"name":"_offset","type":"uint256"},{"name":"_account","type":"address"},{"name":"_factory","type":"address"}],"outputs":[{"name":"","type":"tuple[]","components":[{"name":"id","type":"uint256"},{"name":"lp","type":"address"},{"name":"liquidity","type":"uint256"},{"name":"staked","type":"uint256"},{"name":"amount0","type":"uint256"},{"name":"amount1","type":"uint256"},{"name":"staked0","type":"uint256"},{"name":"staked1","type":"uint256"},{"name":"unstaked_earned0","type":"uint256"},{"name":"unstaked_earned1","type":"uint256"},{"name":"emissions_earned","type":"uint256"},{"name":"tick_lower","type":"int24"},{"name":"tick_upper","type":"int24"},{"name":"sqrt_ratio_lower","type":"uint160"},{"name":"sqrt_ratio_upper","type":"uint160"}]}]},{"stateMutability":"view","type":"function","name":"epochsLatest","inputs":[{"name":"_limit","type":"uint256"},{"name":"_offset","type":"uint256"}],"outputs":[{"name":"","type":"tuple[]","components":[{"name":"ts","type":"uint256"},{"name":"lp","type":"address"},{"name":"votes","type":"uint256"},{"name":"emissions","type":"uint256"},{"name":"bribes","type":"tuple[]","components":[{"name":"token","type":"address"},{"name":"amount","type":"uint256"}]},{"name":"fees","type":"tuple[]","components":[{"name":"token","type":"address"},{"name":"amount","type":"uint256"}]}]}]},{"stateMutability":"view","type":"function","name":"epochsByAddress","inputs":[{"name":"_limit","type":"uint256"},{"name":"_offset","type":"uint256"},{"name":"_address","type":"address"}],"outputs":[{"name":"","type":"tuple[]","components":[{"name":"ts","type":"uint256"},{"name":"lp","type":"address"},{"name":"votes","type":"uint256"},{"name":"emissions","type":"uint256"},{"name":"bribes","type":"tuple[]","components":[{"name":"token","type":"address"},{"name":"amount","type":"uint256"}]},{"name":"fees","type":"tuple[]","components":[{"name":"token","type":"address"},{"name":"amount","type":"uint256"}]}]}]},{"stateMutability":"view","type":"function","name":"rewards","inputs":[{"name":"_limit","type":"uint256"},{"name":"_offset","type":"uint256"},{"name":"_venft_id","type":"uint256"}],"outputs":[{"name":"","type":"tuple[]","components":[{"name":"venft_id","type":"uint256"},{"name":"lp","type":"address"},{"name":"amount","type":"uint256"},{"name":"token","type":"address"},{"name":"fee","type":"address"},{"name":"bribe","type":"address"}]}]},{"stateMutability":"view","type":"function","name":"rewardsByAddress","inputs":[{"name":"_venft_id","type":"uint256"},{"name":"_pool","type":"address"}],"outputs":[{"name":"","type":"tuple[]","components":[{"name":"venft_id","type":"uint256"},{"name":"lp","type":"address"},{"name":"amount","type":"uint256"},{"name":"token","type":"address"},{"name":"fee","type":"address"},{"name":"bribe","type":"address"}]}]},{"stateMutability":"view","type":"function","name":"MAX_FACTORIES","inputs":[],"outputs":[{"name":"","type":"uint256"}]},{"stateMutability":"view","type":"function","name":"MAX_POOLS","inputs":[],"outputs":[{"name":"","type":"uint256"}]},{"stateMutability":"view","type":"function","name":"MAX_TOKENS","inputs":[],"outputs":[{"name":"","type":"uint256"}]},{"stateMutability":"view","type":"function","name":"MAX_LPS","inputs":[],"outputs":[{"name":"","type":"uint256"}]},{"stateMutability":"view","type":"function","name":"MAX_EPOCHS","inputs":[],"outputs":[{"name":"","type":"uint256"}]},{"stateMutability":"view","type":"function","name":"MAX_REWARDS","inputs":[],"outputs":[{"name":"","type":"uint256"}]},{"stateMutability":"view","type":"function","name":"MAX_POSITIONS","inputs":[],"outputs":[{"name":"","type":"uint256"}]},{"stateMutability":"view","type":"function","name":"WEEK","inputs":[],"outputs":[{"name":"","type":"uint256"}]},{"stateMutability":"view","type":"function","name":"registry","inputs":[],"outputs":[{"name":"","type":"address"}]},{"stateMutability":"view","type":"function","name":"voter","inputs":[],"outputs":[{"name":"","type":"address"}]},{"stateMutability":"view","type":"function","name":"convertor","inputs":[],"outputs":[{"name":"","type":"address"}]},{"stateMutability":"view","type":"function","name":"cl_helper","inputs":[],"outputs":[{"name":"","type":"address"}]}];

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
const CLAIM_BRIBES_CONTRACT = '0x16613524e02ad97eDfeF371bC883F2F5d6C480A5';
const CLAIM_BRIBES_ABI = [{"inputs":[{"internalType":"address","name":"_forwarder","type":"address"},{"internalType":"address","name":"_ve","type":"address"},{"internalType":"address","name":"_factoryRegistry","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"AlreadyVotedOrDeposited","type":"error"},{"inputs":[],"name":"DistributeWindow","type":"error"},{"inputs":[],"name":"FactoryPathNotApproved","type":"error"},{"inputs":[],"name":"GaugeAlreadyKilled","type":"error"},{"inputs":[],"name":"GaugeAlreadyRevived","type":"error"},{"inputs":[{"internalType":"address","name":"_pool","type":"address"}],"name":"GaugeDoesNotExist","type":"error"},{"inputs":[],"name":"GaugeExists","type":"error"},{"inputs":[{"internalType":"address","name":"_gauge","type":"address"}],"name":"GaugeNotAlive","type":"error"},{"inputs":[],"name":"InactiveManagedNFT","type":"error"},{"inputs":[],"name":"MaximumVotingNumberTooLow","type":"error"},{"inputs":[],"name":"NonZeroVotes","type":"error"},{"inputs":[],"name":"NotAPool","type":"error"},{"inputs":[],"name":"NotApprovedOrOwner","type":"error"},{"inputs":[],"name":"NotEmergencyCouncil","type":"error"},{"inputs":[],"name":"NotGovernor","type":"error"},{"inputs":[],"name":"NotMinter","type":"error"},{"inputs":[],"name":"NotWhitelistedNFT","type":"error"},{"inputs":[],"name":"NotWhitelistedToken","type":"error"},{"inputs":[],"name":"SameValue","type":"error"},{"inputs":[],"name":"SpecialVotingWindow","type":"error"},{"inputs":[],"name":"TooManyPools","type":"error"},{"inputs":[],"name":"UnequalLengths","type":"error"},{"inputs":[],"name":"ZeroAddress","type":"error"},{"inputs":[],"name":"ZeroBalance","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"voter","type":"address"},{"indexed":true,"internalType":"address","name":"pool","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"weight","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalWeight","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"Abstained","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"gauge","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DistributeReward","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"poolFactory","type":"address"},{"indexed":true,"internalType":"address","name":"votingRewardsFactory","type":"address"},{"indexed":true,"internalType":"address","name":"gaugeFactory","type":"address"},{"indexed":false,"internalType":"address","name":"pool","type":"address"},{"indexed":false,"internalType":"address","name":"bribeVotingReward","type":"address"},{"indexed":false,"internalType":"address","name":"feeVotingReward","type":"address"},{"indexed":false,"internalType":"address","name":"gauge","type":"address"},{"indexed":false,"internalType":"address","name":"creator","type":"address"}],"name":"GaugeCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"gauge","type":"address"}],"name":"GaugeKilled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"gauge","type":"address"}],"name":"GaugeRevived","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"reward","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"NotifyReward","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"voter","type":"address"},{"indexed":true,"internalType":"address","name":"pool","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"weight","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalWeight","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"Voted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"whitelister","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":true,"internalType":"bool","name":"_bool","type":"bool"}],"name":"WhitelistNFT","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"whitelister","type":"address"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":true,"internalType":"bool","name":"_bool","type":"bool"}],"name":"WhitelistToken","type":"event"},{"inputs":[{"internalType":"address[]","name":"_bribes","type":"address[]"},{"internalType":"address[][]","name":"_tokens","type":"address[][]"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"claimBribes","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_fees","type":"address[]"},{"internalType":"address[][]","name":"_tokens","type":"address[][]"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"claimFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_gauges","type":"address[]"}],"name":"claimRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"claimable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_poolFactory","type":"address"},{"internalType":"address","name":"_pool","type":"address"}],"name":"createGauge","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_mTokenId","type":"uint256"}],"name":"depositManaged","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_gauges","type":"address[]"}],"name":"distribute","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_start","type":"uint256"},{"internalType":"uint256","name":"_finish","type":"uint256"}],"name":"distribute","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"emergencyCouncil","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"epochGovernor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_timestamp","type":"uint256"}],"name":"epochNext","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"_timestamp","type":"uint256"}],"name":"epochStart","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"_timestamp","type":"uint256"}],"name":"epochVoteEnd","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"_timestamp","type":"uint256"}],"name":"epochVoteStart","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"factoryRegistry","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"forwarder","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"gaugeToBribe","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"gaugeToFees","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"gauges","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"governor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"_tokens","type":"address[]"},{"internalType":"address","name":"_minter","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isAlive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isGauge","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"forwarder","type":"address"}],"name":"isTrustedForwarder","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"isWhitelistedNFT","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isWhitelistedToken","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_gauge","type":"address"}],"name":"killGauge","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lastVoted","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"length","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxVotingNum","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"poke","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"poolForGauge","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolVote","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"pools","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"reset","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_gauge","type":"address"}],"name":"reviveGauge","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_council","type":"address"}],"name":"setEmergencyCouncil","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_epochGovernor","type":"address"}],"name":"setEmergencyCouncil","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_governor","type":"address"}],"name":"setGovernor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxVotingNum","type":"uint256"}],"name":"setMaxVotingNum","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalWeight","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_gauge","type":"address"}],"name":"updateFor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"end","type":"uint256"}],"name":"updateFor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_gauges","type":"address[]"}],"name":"updateFor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"usedWeights","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ve","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"address[]","name":"_poolVote","type":"address[]"},{"internalType":"uint256[]","name":"_weights","type":"uint256[]"}],"name":"vote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"votes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"weights","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"bool","name":"_bool","type":"bool"}],"name":"whitelistNFT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"bool","name":"_bool","type":"bool"}],"name":"whitelistToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"withdrawManaged","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const SPENDER_ADDRESS = '0x6Cb442acF35158D5eDa88fe602221b67B400Be3E';
const ERC20_ABI = [
  "function approve(address spender, uint256 amount) public returns (bool)",
  "function allowance(address owner, address spender) public view returns (uint256)"
];

const VOTER_CONTRACT_ADDRESS = '0x61366A4e6b1DB1b85DD701f2f4BFa275EF271197';

// Add this function at the top of your file, outside of the App component
const downloadJSON = (data, filename) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const href = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = href;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(href);
};

function App() {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [rewardsData, setRewardsData] = useState([]);
  const [error, setError] = useState(null);
  const [copySuccess, setCopySuccess] = useState('');
  const [tokenDecimals, setTokenDecimals] = useState({});
  const [safeTransactionData, setSafeTransactionData] = useState(null);
  const [votingPoolAddress, setVotingPoolAddress] = useState('');
  const [bulkVoteData, setBulkVoteData] = useState(null);

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setRewardsData([]);
    setError(null);
    setSafeTransactionData(null);
    setBulkVoteData(null); // Clear bulk vote data
    setTokenDecimals({});

    try {
      const provider = new ethers.providers.JsonRpcProvider('https://mainnet.base.org');
      const contract = new ethers.Contract(contractAddress, contractABI, provider);
      
      console.log('Fetching data for address:', address);
      const data = await contract.byAccount(address);
      console.log('Raw data:', data);

      if (data.length === 0) {
        setError('No data found for this address');
        return;
      }

      setResult(data);

      // Fetch rewards data
      const rewardsContract = new ethers.Contract(rewardsContractAddress, rewardsContractABI, provider);
      const uniqueCombinations = getUniqueVenftLpCombinations(data);
      const rewardsPromises = uniqueCombinations.map(combo => 
        rewardsContract.rewardsByAddress(combo.venftId, combo.lpAddress)
      );
      const rewardsResults = await Promise.all(rewardsPromises);
      setRewardsData(rewardsResults.flat());

      // Fetch token decimals
      const uniqueTokens = [...new Set(rewardsResults.flat().map(reward => reward.token))];
      const decimalsPromises = uniqueTokens.map(async (tokenAddress) => {
        const tokenContract = new ethers.Contract(tokenAddress, ['function decimals() view returns (uint8)'], provider);
        const decimals = await tokenContract.decimals();
        return [tokenAddress, decimals];
      });
      const decimalsResults = await Promise.all(decimalsPromises);
      setTokenDecimals(Object.fromEntries(decimalsResults));

    } catch (error) {
      console.error('Error fetching data:', error);
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getUniqueVenftLpCombinations = (data) => {
    const combinations = new Set();
    data.forEach(item => {
      item.votes.forEach(vote => {
        combinations.add(`${item.id.toString()}-${vote.lp}`);
      });
    });
    
    return Array.from(combinations).map(combo => {
      const [venftId, lpAddress] = combo.split('-');
      return { venftId, lpAddress };
    });
  };

  const getNonZeroAddress = (fee, bribe) => {
    return fee !== ZERO_ADDRESS ? fee : bribe;
  };

  const groupRewardsByFeeBribe = (rewardsData) => {
    const grouped = {};
    rewardsData.forEach(reward => {
      const feeBribeAddress = getNonZeroAddress(reward.fee, reward.bribe);
      if (!grouped[feeBribeAddress]) {
        grouped[feeBribeAddress] = {
          venft_id: reward.venft_id.toString(),
          lp: reward.lp,
          tokens: new Set(),
          feeBribeAddress
        };
      }
      grouped[feeBribeAddress].tokens.add(reward.token);
    });

    return Object.values(grouped).map(item => ({
      ...item,
      tokens: Array.from(item.tokens)
    }));
  };

  const groupedRewardsData = groupRewardsByFeeBribe(rewardsData);

  const calculateTotalRewards = (rewardsData) => {
    const totals = {};
    rewardsData.forEach(reward => {
      if (!totals[reward.token]) {
        totals[reward.token] = ethers.BigNumber.from(0);
      }
      totals[reward.token] = totals[reward.token].add(reward.amount);
    });
    return Object.entries(totals).map(([token, amount]) => ({
      token,
      amount: amount.toString(),
      formattedAmount: ethers.utils.formatUnits(amount, tokenDecimals[token] || 18)
    }));
  };

  const totalRewards = calculateTotalRewards(rewardsData);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    } catch (err) {
      setCopySuccess('Failed to copy');
    }
  };

  const generateSafeTransaction = async () => {
    if (!groupedRewardsData.length) return;

    const provider = new ethers.providers.JsonRpcProvider('https://mainnet.base.org');
    const claimBribesContract = new ethers.Contract(CLAIM_BRIBES_CONTRACT, CLAIM_BRIBES_ABI, provider);

    const transactions = [];
    const tokenApprovals = new Map();

    // First, aggregate total amounts for each token
    for (const reward of rewardsData) {
      const { token, amount } = reward;
      if (tokenApprovals.has(token)) {
        tokenApprovals.set(token, tokenApprovals.get(token).add(ethers.BigNumber.from(amount)));
      } else {
        tokenApprovals.set(token, ethers.BigNumber.from(amount));
      }
    }

    // Generate approval transactions
    for (const [token, amount] of tokenApprovals) {
      const tokenContract = new ethers.Contract(token, ERC20_ABI, provider);
      const approvalData = tokenContract.interface.encodeFunctionData('approve', [SPENDER_ADDRESS, amount]);
      transactions.push({
        to: token,
        value: "0",
        data: approvalData,
        contractMethod: {
          inputs: [
            { name: "spender", type: "address" },
            { name: "amount", type: "uint256" }
          ],
          name: "approve",
          payable: false
        },
        contractInputsValues: {
          spender: SPENDER_ADDRESS,
          amount: amount.toString()
        }
      });
    }

    // Generate claim transactions
    for (const venftId of new Set(groupedRewardsData.map(r => r.venft_id))) {
      const rewardsForVenft = groupedRewardsData.filter(r => r.venft_id === venftId);
      
      const uniqueFeeBribeAddresses = [];
      const correspondingTokenLists = [];

      for (const reward of rewardsForVenft) {
        const { feeBribeAddress, tokens } = reward;
        
        if (!uniqueFeeBribeAddresses.includes(feeBribeAddress)) {
          uniqueFeeBribeAddresses.push(feeBribeAddress);
          correspondingTokenLists.push(tokens);
        } else {
          const index = uniqueFeeBribeAddresses.indexOf(feeBribeAddress);
          correspondingTokenLists[index] = [...new Set([...correspondingTokenLists[index], ...tokens])];
        }
      }

      const claimBribesData = claimBribesContract.interface.encodeFunctionData('claimBribes', [
        uniqueFeeBribeAddresses,
        correspondingTokenLists,
        venftId
      ]);

      transactions.push({
        to: CLAIM_BRIBES_CONTRACT,
        value: "0",
        data: claimBribesData,
        contractMethod: {
          inputs: [
            { name: "_bribes", type: "address[]" },
            { name: "_tokens", type: "address[][]" },
            { name: "_tokenId", type: "uint256" }
          ],
          name: "claimBribes",
          payable: false
        },
        contractInputsValues: {
          _bribes: uniqueFeeBribeAddresses,
          _tokens: correspondingTokenLists,
          _tokenId: venftId.toString()
        }
      });
    }

    const gnosisCompatibleJSON = {
      version: "1.0",
      chainId: "8453", // Base mainnet chain ID
      createdAt: Date.now(),
      meta: {
        name: "Claim Bribes and Approval Transactions",
        description: "Batch transactions for claiming bribes and approving token transfers",
        txBuilderVersion: "1.17.0",
        createdFromSafeAddress: address,
        createdFromOwnerAddress: "",
        checksum: ""
      },
      transactions: transactions
    };

    setSafeTransactionData(gnosisCompatibleJSON);
  };

  const handleVotingPoolAddressChange = (e) => {
    setVotingPoolAddress(e.target.value);
  };

  const generateBulkVoteTransaction = async () => {
    if (!address || !votingPoolAddress) return;

    setLoading(true);
    setError(null);
    setBulkVoteData(null);
    setResult(null); // Clear reward results
    setRewardsData([]); // Clear reward data
    setSafeTransactionData(null); // Clear safe transaction data
    setTokenDecimals({}); // Clear token decimals

    try {
      const provider = new ethers.providers.JsonRpcProvider('https://mainnet.base.org');
      const contract = new ethers.Contract(contractAddress, contractABI, provider);
      
      const data = await contract.byAccount(address);
      
      if (data.length === 0) {
        setError('No NFTs found for this address');
        return;
      }

      const nftIds = data.map(item => item.id);
      
      const voterContract = new ethers.Contract(VOTER_CONTRACT_ADDRESS, CLAIM_BRIBES_ABI, provider);
      
      // Create individual vote transactions for each NFT
      const transactions = nftIds.map(nftId => ({
        to: VOTER_CONTRACT_ADDRESS,
        value: "0",
        data: voterContract.interface.encodeFunctionData('vote', [
          nftId,
          [votingPoolAddress],
          [ethers.utils.parseUnits('10000', 18)] // Assuming max weight of 10000
        ]),
        contractMethod: {
          inputs: [
            { name: "_tokenId", type: "uint256" },
            { name: "_poolVote", type: "address[]" },
            { name: "_weights", type: "uint256[]" }
          ],
          name: "vote",
          payable: false
        },
        contractInputsValues: {
          _tokenId: nftId.toString(),
          _poolVote: votingPoolAddress,
          _weights: ethers.utils.parseUnits('10000', 18).toString()
        }
      }));

      const gnosisCompatibleJSON = {
        version: "1.0",
        chainId: "8453", // Base mainnet chain ID
        createdAt: Date.now(),
        meta: {
          name: "Bulk Vote Transactions",
          description: "Bulk vote for multiple NFTs",
          txBuilderVersion: "1.17.0",
          createdFromSafeAddress: address,
          createdFromOwnerAddress: "",
          checksum: ""
        },
        transactions: transactions
      };

      setBulkVoteData(gnosisCompatibleJSON);
    } catch (error) {
      console.error('Error generating bulk vote transaction:', error);
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Add these two functions inside your App component
  const handleDownloadSafeTransaction = () => {
    if (safeTransactionData) {
      downloadJSON(safeTransactionData, 'safe_transaction_data.json');
    }
  };

  const handleDownloadBulkVote = () => {
    if (bulkVoteData) {
      downloadJSON(bulkVoteData, 'bulk_vote_data.json');
    }
  };

  return (
    <div className="App">
      <Helmet>
        <title>AERO Batch Tool</title>
      </Helmet>
      <header className="App-header">
        <h1>veAERO Batch Txn Generator</h1>
        <p className="description">
          This tool generates a batch transaction that can be submitted to Gnosis Safe Transaction Builder Tool to claim rewards or do bulk voting for Aerodrome Finance
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={address}
            onChange={handleAddressChange}
            placeholder="Enter EVM wallet address"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'View Rewards'}
          </button>
        </form>
        {loading && <div className="loader">Loading...</div>}
        {error && <div className="error">{error}</div>}
        {result && (
          <div className="result small-text">
            <h2>Total Rewards by Token:</h2>
            <table>
              <thead>
                <tr>
                  <th>Token Address</th>
                  <th>Total Amount (Raw)</th>
                  <th>Total Amount (Formatted)</th>
                </tr>
              </thead>
              <tbody>
                {totalRewards.map((reward, index) => (
                  <tr key={index}>
                    <td>{reward.token}</td>
                    <td>{reward.amount}</td>
                    <td>{parseFloat(reward.formattedAmount).toFixed(6)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pending-rewards">
              <h2>Pending Rewards:</h2>
              <table>
                <thead>
                  <tr>
                    <th>venft_id</th>
                    <th>LP Address</th>
                    <th>Tokens</th>
                    <th>Fee/Bribe Address</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedRewardsData.map((reward, index) => (
                    <tr key={index}>
                      <td>{reward.venft_id}</td>
                      <td>{reward.lp}</td>
                      <td>{JSON.stringify(reward.tokens)}</td>
                      <td>{reward.feeBribeAddress}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {groupedRewardsData.length > 0 && (
          <div>
            <button onClick={generateSafeTransaction}>Generate Safe Transaction</button>
            {safeTransactionData && (
              <div className="json-section">
                <h3>Safe Transaction Data:</h3>
                <div className="json-container">
                  <pre>{JSON.stringify(safeTransactionData, null, 2)}</pre>
                </div>
                <div className="button-container">
                  <button className="copy-button" onClick={() => copyToClipboard(JSON.stringify(safeTransactionData, null, 2))}>
                    {copySuccess || 'Copy to Clipboard'}
                  </button>
                  <button className="download-button" onClick={handleDownloadSafeTransaction}>
                    Download JSON
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="bulk-vote-section">
          <h2>Bulk Vote</h2>
          <input
            type="text"
            value={address}
            onChange={handleAddressChange}
            placeholder="Enter EVM wallet address"
            required
          />
          <input
            type="text"
            value={votingPoolAddress}
            onChange={handleVotingPoolAddressChange}
            placeholder="Enter voting pool address"
            required
          />
          <button onClick={generateBulkVoteTransaction} disabled={loading || !address || !votingPoolAddress}>
            Generate Bulk Vote Transaction
          </button>
        </div>

        {bulkVoteData && (
          <div className="json-section">
            <h3>Bulk Vote Transaction Data:</h3>
            <div className="json-container">
              <pre>{JSON.stringify(bulkVoteData, null, 2)}</pre>
            </div>
            <div className="button-container">
              <button className="copy-button" onClick={() => copyToClipboard(JSON.stringify(bulkVoteData, null, 2))}>
                {copySuccess || 'Copy to Clipboard'}
              </button>
              <button className="download-button" onClick={handleDownloadBulkVote}>
                Download JSON
              </button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;

const styles = `
  .App {
    text-align: center;
    font-size: 25%; /* Reduce all text to 25% of original size */
  }

  .App-header {
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* Align items to the left */
    justify-content: flex-start; /* Align content to the top */
    color: white;
    padding: 20px; /* Add some padding */
  }

  .App-link {
    color: #61dafb;
  }

  h1 {
    font-size: 1em; /* Adjust heading size */
    align-self: center; /* Center the main heading */
    width: 100%;
  }

  input, button {
    font-size: 0.75em; /* Adjust input and button text size */
  }

  .small-text {
    font-size: 0.6em; /* Further reduce size for elements with small-text class */
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  th, td {
    border: 1px solid #ddd;
    padding: 2px;
    text-align: left;
    font-size: 0.75em; /* Adjust table text size */
  }

  .json-section {
    width: 100%;
    max-width: 600px;
    margin-top: 10px;
  }

  .json-container {
    text-align: left;
    width: 100%;
    height: 300px;
    overflow: auto;
    background-color: #1e1e1e;
    border-radius: 4px;
    padding: 10px;
    box-sizing: border-box;
  }

  .json-container pre {
    color: #d4d4d4;
    font-size: 0.6em;
    margin: 0;
    white-space: pre-wrap;
    word-break: break-all;
  }

  .button-container {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }

  .copy-button, .download-button {
    font-size: 0.75em;
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 3px;
    cursor: pointer;
  }

  /* Styles for pending rewards table */
  .pending-rewards {
    text-align: left;
    width: 100%;
    align-self: flex-start; /* Align to the left */
  }

  .pending-rewards table {
    margin-left: 0;
    margin-right: auto;
  }

  .pending-rewards table th,
  .pending-rewards table td {
    font-size: 0.5625em; /* Increase by 50% from previous 0.375em */
  }

  .pending-rewards h2 {
    font-size: 1.2em; /* Increase heading size proportionally */
    margin-top: 10px; /* Add some space above the heading */
  }

  /* Center other elements */
  .result {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .result > *:not(.pending-rewards) {
    width: 100%;
    max-width: 600px; /* Adjust as needed */
  }
`;

document.head.appendChild(document.createElement('style')).textContent = styles;
