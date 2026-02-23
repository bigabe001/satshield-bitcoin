# ₿ SatShield: ZK-Time-Lock Leaderboard
**A Privacy-First Reputation Layer for the Midl Bitcoin Ecosystem**

---

## The Vision: Reputation Without Surveillance
Building on Bitcoin used to require "blood, sweat, and tears." Now, with **Midl L2**, Bitcoin is as programmable as any other chain. 

**SatShield** is a decentralized "Proof-of-Commitment" dApp. It allows users to "Shield" their BTC in a time-locked vault to earn a **ZK-Vibe Score**. Unlike traditional leaderboards that dox your wealth, SatShield ranks users based on **Time-on-Chain**—proving you are a "Diamond Hand" without revealing your total wallet balance.

## Tech Stack (The "Vibe Coding" Sprint)
This project was speed-run in a 14-day sprint, leveraging AI to bridge the gap between Bitcoin-native assets and EVM logic.

- **On-Chain Logic:** Solidity smart contracts deployed on a Midl-compatible RPC.
- **Wallet Integration:** Full **Xverse Wallet** support (EVM-injection).
- **Frontend:** Next.js 16 (Turbopack) with a custom Satoshi-Terminal glass-morphism UI.
- **ZK-Logic:** Time-weighting abstraction to provide competitive rankings while maintaining balance privacy.

---

## How it Works
1. **Connect:** The user connects their **Xverse Wallet**.
2. **Shield:** User triggers `shieldSats()` to deposit 0.1 BTC into the vault.
3. **Lock:** The contract records the `block.timestamp`.
4. **ZK-Vibe:** The UI calculates a real-time reputation score based on the duration of the lock.
5. **Leaderboard:** Users are ranked by their commitment, not their bank account.

---

## Technical Challenges Overcome

### Monorepo Dependency Bypass
Faced with `workspace:^` protocol issues in the monorepo, we successfully re-architected the dapp to use a standalone dependency injection model, ensuring the Next.js Turbopack builder could resolve `ethers.js` and `Xverse` providers without hydration errors.

### Xverse-EVM Bridge
Implemented a custom provider-detection hook to ensure the Xverse EVM-compatible layer correctly signs transactions for the Midl-compatible RPC, providing a seamless Bitcoin-to-L2 user experience.

### On-Chain Bytecode Verification
Confirmed the deployment at the protocol level.
**Contract Address:** `0x5FbDB2315678afecb367f032d93F642f64180aa3`  
**RPC Verification:** Verified via raw JSON-RPC `eth_getCode` call, returning full bytecode on the Midl-compatible node.

![Deployment Proof](./deployment_proof.png)
*Above: Raw bytecode verification confirming the SatShield contract is live on the Midl-compatible RPC.*

---

## Quick Start (Local Verification)

### 1. Smart Contract Deployment
```bash
cd contracts
npx hardhat node
npx hardhat run scripts/deploy_simple.ts --network localhost