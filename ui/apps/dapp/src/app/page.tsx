'use client';
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Shield, Trophy, Timer, activity, Lock, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ABI = ["function shieldSats() public payable", "function amounts(address) public view returns (uint256)"];

export default function Home() {
  const [status, setStatus] = useState("DISCONNECTED");
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
    if (!window.ethereum) return alert("Install a wallet!");
    try {
      setIsShielding(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      setAccount(await signer.getAddress());
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      
      const tx = await contract.shieldSats({ value: ethers.parseEther("0.1") });
      await tx.wait();
      setStatus("SHIELD ACTIVE");
      setIsShielding(false);
    } catch (err) {
      console.error(err);
      setIsShielding(false);
      setStatus("ERROR");
    }
  }

  return (
    <main className="min-h-screen bg-[#050505] text-[#F7931A] font-mono p-8 flex flex-col items-center justify-center">
      {/* Background Glow */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#F7931A] opacity-5 blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Left Column: Stats */}
        <div className="space-y-6">
          <div className="bg-[#111] border border-[#333] p-6 rounded-2xl">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <Timer size={16} /> LOCK DURATION
            </div>
            <div className="text-3xl font-bold text-white">{vibeScore}s</div>
          </div>
          <div className="bg-[#111] border border-[#333] p-6 rounded-2xl">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <Zap size={16} /> NETWORK
            </div>
            <div className="text-xl font-bold text-white">MIDL REGTEST</div>
          </div>
        </div>

        {/* Center: Main Action */}
        <div className="md:col-span-2 bg-[#111] border-2 border-[#F7931A] p-8 rounded-3xl shadow-[0_0_50px_-12px_rgba(247,147,26,0.3)] text-center relative overflow-hidden">
          <div className="relative z-10">
            <Shield className="mx-auto mb-4 text-[#F7931A]" size={64} />
            <h1 className="text-4xl font-black mb-2 tracking-tighter">SATSHIELD</h1>
            <p className="text-gray-400 text-sm mb-8 italic">"Privacy is a right, not a privilege."</p>
            
            <div className="mb-8">
              <div className="text-[10px] text-gray-500 mb-1">ZK-PROVEN VIBE SCORE</div>
              <div className="text-6xl font-black text-white tabular-nums tracking-widest">{vibeScore.toString().padStart(4, '0')}</div>
            </div>

            <button 
              onClick={handleShield}
              disabled={isShielding}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                isShielding ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-[#F7931A] text-black hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              {isShielding ? "TRANSACTING..." : "SHIELD 0.1 BTC"}
            </button>
            <div className="mt-4 text-[10px] text-gray-600 truncate">
              {account ? `CONNECTED: ${account}` : `STATUS: ${status}`}
            </div>
          </div>
        </div>

        {/* Bottom: Leaderboard */}
        <div className="md:col-span-3 bg-[#111] border border-[#333] p-6 rounded-2xl">
          <div className="flex items-center gap-2 mb-4">
            <Trophy size={20} /> <span className="font-bold">ZK-LEADERBOARD</span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-[#1a1a1a] rounded-lg border border-[#F7931A]/30">
              <span className="flex items-center gap-2"><Lock size={14} className="text-[#0f0]"/> {account ? "YOU" : "PROVING..."}</span>
              <span className="font-bold text-[#0f0]">{vibeScore} PTS</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-black/50 rounded-lg opacity-40">
              <span className="flex items-center gap-2"><Lock size={14}/> satoshi.midl</span>
              <span>1,420 PTS</span>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}