veAERO Bulk Transaction Generator Tool (Gnosis Safe)

This is a personal productivity tool I built to generate bulk transactions for different voter operations (claimBribes, vote) for veAERO owners.

So far the supported operations are 1) claimBribes 2) Vote

The tool generates a downloadable JSON that be directly imported into Gnosis Safe Transaction Builder Tool.

Ensure you eview the 1) Decoded Transaction on screen 2) Run Simluate on Tenderly before you actually sign any transactions.
![image](https://github.com/user-attachments/assets/dbebed1c-c55a-4c37-808a-6f05bb0890bc)

List of Contracts that this tool interacts with
1) Aerodrome Sugar Contracts (Read-Only)
  **0x4c5d3925fe65DFeB5A079485136e4De09cb664A5** byAccount() - to get the list of veAEROs held in a given wallet address
  **0x68c19e13618c41158fe4baba1b8fb3a9c74bdb0a** rewardsByAddress() - to get the list of pending voter rewards/incentives waiting to be claimed
2) Aerodrome Voter
**0x16613524e02ad97eDfeF371bC883F2F5d6C480A5**
 claimBribe() function - This contract ABI is used to generate the batch transaction JSON to claim all rewards
 vote() function - This contract ABI is used to generate the batch transaction JSON to bulk vote to a specific

The Contract ABIs are hardcoded into the tool. If the smart contract ABIs are upgarded this tool might break.

**Token Approval for Aerodrome Universal Router**
(Optional) This is an optional you can skip if you dont want to swap. YOu need to manually remove these transactions from the TransactionBuilder Tool if you dont want this.
In the end all the claimed tokens are executed with allowance for Aerodrome Universal Router **0x6Cb442acF35158D5eDa88fe602221b67B400Be3E**  that can be used to swap to token of your choice.


