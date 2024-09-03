This is personal productivity tool I built to bulk claim veAERO voter rewards (bribes and incentives)


This is a React App built using cursor.com in less than an hour

npm install

npm start

![image](https://github.com/user-attachments/assets/67dc6fc9-be36-4d53-ab7e-a7031a5d9b6d)

Every week veAERO voters claim rewards. As of Sep 2024, it is not possible to split veAERO NFTs and for easier liqiduity most veAERO voters hold quite a bit of separate veAERO NFTs.

For eg: someone who has 50+ AERO NFTs has to click and sign 50 different transactions every week. If you are holding your veNFTs on Gnosis Safe, this app creates a batch transaction that you can use to claim all the rewards in a single transaction. You can just copy paste the generated JSON to Gnosis Safe Transaction Builder.

Use the Aerodrome **Sugar Contracts** to derive the rewards to be claimed
https://github.com/aerodrome-finance/sugar
1) **0x4c5d3925fe65DFeB5A079485136e4De09cb664A5**
byAccount() method
2) **0x68c19e13618c41158fe4baba1b8fb3a9c74bdb0a**
rewardsByAddress() method


Then uses the Voter Contract **0x16613524e02ad97eDfeF371bC883F2F5d6C480A5** to create multiple claimBribe() function calls for each veAERO NFT and batch all transactions into one
![image](https://github.com/user-attachments/assets/dbebed1c-c55a-4c37-808a-6f05bb0890bc)



**Token Approval for Aerodrome Universal Router**
(Optional) This is an optional you can skip if you dont want to swap
In the end all the claimed tokens are executed with allowance for Aerodrome Universal Router **0x6Cb442acF35158D5eDa88fe602221b67B400Be3E**  that can be used to swap to token of your choice.


