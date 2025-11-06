import { Header } from "@/components/Layout/Header";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import { UserPlus, Sword, CheckCircle, LinkIcon, Share2 } from "lucide-react";

const mockFriends = [
  { id: 1, name: "Coder Luna 🌙", status: "online", xp: 1450 },
  { id: 2, name: "Java Knight 🛡️", status: "offline", xp: 1200 },
];

const mockRequests = [
  { id: 3, name: "Debug Witch 🧙‍♀️", status: "pending" },
];

export default function Friends() {
  const [friends, setFriends] = useState(mockFriends);
  const [requests, setRequests] = useState(mockRequests);

  const acceptRequest = (id: number) => {
    const accepted = requests.find((r) => r.id === id);
    if (accepted) {
      setFriends([...friends, { ...accepted, xp: 1000, status: "online" }]);
      setRequests(requests.filter((r) => r.id !== id));
    }
  };

  // 🧩 Share Invite Links
  const inviteMessage =
    "Join me on Java Quest! 🧙‍♂️ Learn Java, challenge friends & earn XP together! ⚔️";
  const shareUrl = "https://javaquest.example.com"; // Change to your domain

  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(
      inviteMessage + " " + shareUrl
    )}`,
    instagram: `https://www.instagram.com/direct/new/?text=${encodeURIComponent(
      inviteMessage + " " + shareUrl
    )}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(
      shareUrl
    )}&text=${encodeURIComponent(inviteMessage)}`,
    snapchat: `https://www.snapchat.com/scan?attachmentUrl=${encodeURIComponent(
      shareUrl
    )}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      inviteMessage + " " + shareUrl
    )}`,
  };

  const copyInvite = () => {
    navigator.clipboard.writeText(`${inviteMessage} ${shareUrl}`);
    alert("✅ Invite link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-100 dark:from-gray-900 dark:to-purple-900">
      <Header />

      <main className="container py-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold font-pixel text-primary mb-6"
        >
          👥 Connect with Friends
        </motion.h1>

        <p className="text-muted-foreground mb-8">
          Add friends, challenge them, and grow your XP together 💪
        </p>

        {/* Friend Requests */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/70 dark:bg-gray-900/40 p-6 rounded-xl shadow-lg max-w-xl mx-auto mb-10"
        >
          <h2 className="font-bold text-lg mb-4 text-primary flex justify-center items-center space-x-2">
            <UserPlus className="w-5 h-5" />
            <span>Friend Requests</span>
          </h2>
          {requests.length > 0 ? (
            requests.map((req) => (
              <motion.div
                key={req.id}
                whileHover={{ scale: 1.02 }}
                className="flex justify-between items-center bg-white/80 dark:bg-gray-800 p-3 rounded-lg mb-2 shadow"
              >
                <span className="font-medium">{req.name}</span>
                <Button size="sm" onClick={() => acceptRequest(req.id)}>
                  <CheckCircle className="w-4 h-4 mr-2" /> Accept
                </Button>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No new requests</p>
          )}
        </motion.div>

        {/* Friends List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/70 dark:bg-gray-900/40 p-6 rounded-xl shadow-lg max-w-3xl mx-auto mb-12"
        >
          <h2 className="font-bold text-lg mb-4 text-primary flex justify-center items-center space-x-2">
            <Sword className="w-5 h-5" />
            <span>My Friends</span>
          </h2>

          {friends.length > 0 ? (
            friends.map((f) => (
              <motion.div
                key={f.id}
                whileHover={{ scale: 1.02 }}
                className="flex justify-between items-center bg-white/80 dark:bg-gray-800 p-3 rounded-lg mb-2 shadow"
              >
                <div className="text-left">
                  <h3 className="font-semibold">{f.name}</h3>
                  <p className="text-xs text-gray-500">{f.xp} XP</p>
                </div>
                <Button size="sm" variant="outline">
                  Challenge ⚔️
                </Button>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No friends yet 😔</p>
          )}
        </motion.div>

        {/* 🌍 Invite Friends Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-yellow-100 via-pink-100 to-orange-100 dark:from-gray-800 dark:via-purple-800 dark:to-indigo-800 p-8 rounded-2xl shadow-2xl max-w-2xl mx-auto text-center border border-primary/30"
        >
          <h2 className="font-pixel text-3xl text-primary mb-4">
            🌟 Invite More Adventurers!
          </h2>
          <p className="text-muted-foreground mb-6 text-sm md:text-base">
            Bring your friends to <b>Java Quest</b> and level up together!  
            Share your invite on social media 🚀
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <Button asChild className="bg-green-500 hover:bg-green-600 text-white">
              <a href={shareLinks.whatsapp} target="_blank">WhatsApp 💬</a>
            </Button>
            <Button asChild className="bg-pink-500 hover:bg-pink-600 text-white">
              <a href={shareLinks.instagram} target="_blank">Instagram 📸</a>
            </Button>
            <Button asChild className="bg-blue-500 hover:bg-blue-600 text-white">
              <a href={shareLinks.telegram} target="_blank">Telegram ✈️</a>
            </Button>
            <Button asChild className="bg-yellow-400 hover:bg-yellow-500 text-black">
              <a href={shareLinks.snapchat} target="_blank">Snapchat 👻</a>
            </Button>
            <Button asChild className="bg-sky-500 hover:bg-sky-600 text-white">
              <a href={shareLinks.twitter} target="_blank">Twitter 🐦</a>
            </Button>
          </div>

          <Button
            variant="outline"
            className="flex items-center gap-2 mx-auto"
            onClick={copyInvite}
          >
            <LinkIcon className="w-4 h-4" /> Copy Invite Link
          </Button>
        </motion.div>
      </main>
    </div>
  );
}
