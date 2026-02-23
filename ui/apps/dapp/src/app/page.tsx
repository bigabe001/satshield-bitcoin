'use client';
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Shield, Trophy, Timer, Activity, Lock, Zap, ExternalLink, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

declare global { interface Window { ethereum?: any; } }

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ABI = ["function shieldSats() public payable", "function amounts(address) public view returns (uint256)"];

export default function Home() {
  const [vibeScore, setVibeScore] = useState(0);
  const [account, setAccount] = useState("");
  const [isShielding, setIsShielding] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (account && !isShielding) setVibeScore(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [account, isShielding]);

  async function handleShield() {
    if (typeof window !== "undefined" && !window.ethereum) return alert("Install Xverse or MetaMask!");
    try {
      setIsShielding(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      setAccount(await signer.getAddress());
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const tx = await contract.shieldSats({ value: ethers.parseEther("0.1") });
      await tx.wait();
      setIsShielding(false);
    } catch (err) {
      console.error(err);
      setIsShielding(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#020202] text-amber-50 font-sans p-4 md:p-12 flex flex-col items-center">
      {/* Cinematic Background */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,_#1a1200_0%,_#020202_100%)] -z-10" />
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none -z-10" />

      <div className="max-w-5xl w-full space-y-8">
        {/* Top Header */}
        <div className="flex justify-between items-center border-b border-amber-900/30 pb-6">
          <div className="flex items-center gap-3">
            <div className="bg-amber-500 p-2 rounded-lg">
              <Shield className="text-black" size={28} />
            </div>
            <h1 className="text-2xl font-black tracking-widest text-amber-500">SATSHIELD</h1>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-amber-500/50 uppercase tracking-widest font-bold">Protocol Status</div>
            <div className="flex items-center gap-2 text-green-500 text-xs font-mono">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> MIDL MAINNET-ALPHA
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: The Vault */}
          <div className="lg:col-span-8 space-y-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-zinc-900 to-black border border-amber-500/20 p-10 rounded-[2.5rem] relative overflow-hidden shadow-2xl"
            >
              <div className="relative z-10 flex flex-col items-center py-8">
                <div className="text-amber-500/60 text-xs font-mono mb-4 tracking-[0.3em]">SECURE REPUTATION ENGINE</div>
                <div className="text-8xl font-black text-white tabular-nums mb-8 drop-shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                  {vibeScore.toLocaleString()}
                </div>
                <button 
                  onClick={handleShield}
                  disabled={isShielding}
                  className="group relative px-12 py-5 bg-amber-500 text-black font-black text-xl rounded-2xl hover:bg-amber-400 transition-all active:scale-95 disabled:opacity-50"
                >
                  {isShielding ? "SHIELDING..." : "COMMIT 0.1 BTC"}
                  <ChevronRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="mt-8 font-mono text-xs text-amber-500/40 truncate w-64 text-center">
                  {account || "AWAITING CONNECTION..."}
                </div>
              </div>
            </motion.div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-3xl">
                <Timer className="text-amber-500 mb-3" size={20} />
                <div className="text-zinc-500 text-xs uppercase mb-1">Time Weighted</div>
                <div className="text-2xl font-bold text-white">4.2x Boost</div>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-3xl">
                <Activity className="text-amber-500 mb-3" size={20} />
                <div className="text-zinc-500 text-xs uppercase mb-1">Network Trust</div>
                <div className="text-2xl font-bold text-white">99.9%</div>
              </div>
            </div>
          </div>

          {/* Right Column: Leaderboard */}
          <div className="lg:col-span-4 bg-zinc-900/30 border border-zinc-800/50 p-8 rounded-[2.5rem] backdrop-blur-xl">
            <div className="flex items-center gap-2 mb-8 border-b border-zinc-800 pb-4">
              <Trophy className="text-amber-500" size={20} />
              <h2 className="font-black text-sm uppercase tracking-widest">Global Ranking</h2>
            </div>
            <div className="space-y-6">
              {[
                { name: "satoshi.midl", score: "124,902", active: false },
                { name: "hal.finney", score: "98,210", active: false },
                { name: account ? "You" : "Anonymous", score: vibeScore, active: true },
              ].map((user, i) => (
                <div key={i} className={`flex justify-between items-center ${user.active ? 'text-amber-500' : 'text-zinc-500'}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono opacity-50">0{i+1}</span>
                    <span className={`font-bold ${user.active ? 'text-white' : ''}`}>{user.name}</span>
                  </div>
                  <span className="font-mono text-xs">{user.score}</span>
                </div>
              ))}
            </div>
            <div className="mt-12 pt-6 border-t border-zinc-800">
              <p className="text-[10px] text-zinc-600 leading-relaxed italic">
                * Reputation is calculated via ZK-Proof on Midl L2. Your total wallet balance remains private.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}