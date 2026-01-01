import { Header } from "@/components/Layout/Header";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  UserPlus,
  Sword,
  CheckCircle,
  X,
  Search,
  MessageCircle,
  Trophy,
  Timer,
  LinkIcon,
} from "lucide-react";

type Friend = {
  id: number;
  name: string;
  status: "online" | "ingame" | "offline";
  xp: number;
};

export default function Friends() {
  // FRIENDS
  const [friends, setFriends] = useState<Friend[]>([
    { id: 1, name: "Coder Luna 🌙", status: "online", xp: 1450 },
    { id: 2, name: "Java Knight 🛡️", status: "offline", xp: 1200 },
  ]);

  // REQUESTS
  const [requests, setRequests] = useState([{ id: 3, name: "Debug Witch 🧙‍♀️" }]);

  // SEARCH USERS
  const [search, setSearch] = useState("");
  const [allUsers] = useState([
    { id: 10, name: "Algorithm Ace 🤖" },
    { id: 11, name: "Bug Hunter 🐛" },
    { id: 12, name: "Code Wizard 🪄" },
  ]);
  const [sentRequests, setSentRequests] = useState<number[]>([]);

  // CHAT
  const [openChat, setOpenChat] = useState<Friend | null>(null);
  const [messages, setMessages] = useState<{ user: string; text: string }[]>([]);
  const [chatText, setChatText] = useState("");

  // CHALLENGE
  const [challengeUser, setChallengeUser] = useState<Friend | null>(null);
  const [topic, setTopic] = useState("Java Basics");
  const [difficulty, setDifficulty] = useState("Easy");

  // ACTIONS
  const acceptRequest = (id: number) => {
    const user = requests.find((r) => r.id === id);
    if (!user) return;

    setFriends([...friends, { id, name: user.name, status: "online", xp: 900 }]);
    setRequests(requests.filter((r) => r.id !== id));
  };

  const declineRequest = (id: number) =>
    setRequests(requests.filter((r) => r.id !== id));

  const sendRequest = (id: number) =>
    !sentRequests.includes(id) && setSentRequests([...sentRequests, id]);

  const sendMessage = () => {
    if (!chatText.trim()) return;
    setMessages([...messages, { user: "You", text: chatText }]);
    setChatText("");
  };

  // ⭐ SHARE INVITE LINKS
  const inviteMessage =
    "Join me on Java Quest! 🧙‍♂️ Learn Java, challenge friends & earn XP together! ⚔️";

  const shareUrl = "https://javaquest.example.com"; // change when deployed

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
        <h1 className="text-4xl font-pixel font-bold mb-6">
          👥 Connect with Friends
        </h1>

        <p className="text-muted-foreground mb-6">
          Add friends, chat, challenge & grow XP together ⚔️
        </p>

        {/* SEARCH */}
        <div className="bg-white/80 dark:bg-gray-900/40 p-6 rounded-xl shadow max-w-2xl mx-auto mb-10">
          <div className="flex items-center gap-2 mb-2">
            <Search /> <b>Search & Add Friends</b>
          </div>

          <input
            className="w-full p-3 rounded border bg-white dark:bg-gray-800"
            placeholder="Search username or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search &&
            allUsers
              .filter((u) =>
                u.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((u) => (
                <div
                  key={u.id}
                  className="flex justify-between bg-white/80 dark:bg-gray-800 mt-3 p-2 rounded"
                >
                  {u.name}

                  {sentRequests.includes(u.id) ? (
                    <span className="text-sm text-gray-400">Requested</span>
                  ) : (
                    <Button size="sm" onClick={() => sendRequest(u.id)}>
                      <UserPlus className="mr-2 w-4" /> Add
                    </Button>
                  )}
                </div>
              ))}
        </div>

        {/* FRIEND REQUESTS */}
        <div className="bg-white/80 dark:bg-gray-900/40 p-6 rounded-xl shadow max-w-xl mx-auto mb-10">
          <b className="flex gap-2 justify-center">
            <UserPlus /> Friend Requests
          </b>

          {requests.length ? (
            requests.map((r) => (
              <div
                key={r.id}
                className="flex justify-between mt-3 bg-white/80 dark:bg-gray-800 p-2 rounded"
              >
                {r.name}
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => acceptRequest(r.id)}>
                    <CheckCircle className="mr-1 w-4" /> Accept
                  </Button>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => declineRequest(r.id)}
                  >
                    <X />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm mt-3 text-gray-500">No requests</p>
          )}
        </div>

        {/* FRIEND LIST */}
        <div className="bg-white/80 dark:bg-gray-900/40 p-6 rounded-xl shadow max-w-3xl mx-auto mb-10">
          <b className="flex gap-2 justify-center mb-4">
            <Sword /> My Friends
          </b>

          {friends.map((f) => (
            <div
              key={f.id}
              className="flex justify-between bg-white/80 dark:bg-gray-800 p-3 rounded mb-2"
            >
              <div className="text-left">
                <h3 className="font-semibold">{f.name}</h3>
                <p className="text-xs text-gray-400">{f.xp} XP</p>
              </div>

              <div className="flex gap-2 items-center">
                <span
                  className={`text-xs ${
                    f.status === "online"
                      ? "text-green-500"
                      : f.status === "ingame"
                      ? "text-yellow-400"
                      : "text-gray-400"
                  }`}
                >
                  ● {f.status}
                </span>

                <Button size="sm" onClick={() => setOpenChat(f)}>
                  <MessageCircle />
                </Button>

                <Button size="sm" onClick={() => setChallengeUser(f)}>
                  <Trophy />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* 🌍 INVITE FRIENDS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-yellow-100 via-pink-100 to-orange-100 dark:from-gray-800 dark:via-purple-800 dark:to-indigo-900 p-8 rounded-2xl shadow-xl max-w-2xl mx-auto"
        >
          <h2 className="text-2xl font-pixel text-primary mb-3">
            🌟 Invite More Adventurers
          </h2>

          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <Button asChild className="bg-green-500 hover:bg-green-600 text-white">
              <a href={shareLinks.whatsapp} target="_blank">WhatsApp</a>
            </Button>

            <Button asChild className="bg-pink-500 hover:bg-pink-600 text-white">
              <a href={shareLinks.instagram} target="_blank">Instagram</a>
            </Button>

            <Button asChild className="bg-blue-500 hover:bg-blue-600 text-white">
              <a href={shareLinks.telegram} target="_blank">Telegram</a>
            </Button>

            <Button asChild className="bg-yellow-400 hover:bg-yellow-500 text-black">
              <a href={shareLinks.snapchat} target="_blank">Snapchat</a>
            </Button>

            <Button asChild className="bg-sky-500 hover:bg-sky-600 text-white">
              <a href={shareLinks.twitter} target="_blank">Twitter</a>
            </Button>
          </div>

          <Button variant="outline" onClick={copyInvite}>
            <LinkIcon className="w-4 h-4 mr-2" />
            Copy Invite Link
          </Button>
        </motion.div>
      </main>

      {/* CHAT POPUP */}
      <AnimatePresence>
        {openChat && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-8 right-8 bg-white dark:bg-gray-900 p-5 rounded-xl shadow-2xl w-96"
          >
            <h3 className="font-bold mb-2">{openChat.name}</h3>

            <div className="h-40 overflow-y-auto my-3 bg-gray-100 dark:bg-gray-800 p-2 rounded">
              {messages.map((m, i) => (
                <p key={i}>
                  <b>{m.user}: </b>
                  {m.text}
                </p>
              ))}
            </div>

            <input
              className="w-full p-2 border rounded bg-white dark:bg-gray-800"
              placeholder="Type…"
              value={chatText}
              onChange={(e) => setChatText(e.target.value)}
            />

            <div className="flex justify-between mt-4">
              <Button onClick={sendMessage}>Send</Button>
              <Button variant="ghost" onClick={() => setOpenChat(null)}>
                Close
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CHALLENGE POPUP */}
      <AnimatePresence>
        {challengeUser && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="fixed inset-0 bg-black/60 flex justify-center items-center"
          >
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl w-[420px]">
              <h2 className="font-bold text-xl mb-2">
                ⚔️ Challenge {challengeUser.name}
              </h2>

              <label>Topic</label>
              <select
                className="w-full border p-2 my-2 bg-white dark:bg-gray-800"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              >
                <option>Java Basics</option>
                <option>OOP</option>
                <option>Exceptions</option>
              </select>

              <label>Difficulty</label>
              <select
                className="w-full border p-2 my-2 bg-white dark:bg-gray-800"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>

              <div className="flex justify-between mt-4">
                <Button>
                  <Timer className="mr-2" /> Start Duel
                </Button>

                <Button variant="ghost" onClick={() => setChallengeUser(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
