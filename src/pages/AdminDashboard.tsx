import React, { useState, useEffect } from "react";
import Card, { CardHeader, CardContent } from "../components/ui/Card";
import Button from "../components/ui/Button";
import {
  Play,
  Pause,
  Trophy,
  Users,
  Activity,
  AlertTriangle,
} from "lucide-react";
import api from "../lib/api";

const AdminDashboard: React.FC = () => {
  const [games, setGames] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [selectedGame, setSelectedGame] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gamesRes, usersRes] = await Promise.all([
          api.get("/games"),
          api.get("/users"),
        ]);
        setGames(gamesRes.data);
        setUsers(usersRes.data);
        if (gamesRes.data.length > 0) setSelectedGame(gamesRes.data[0]);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleStartGame = async () => {
    try {
      const startTime = new Date();
      const endTime = new Date(Date.now() + 3600000);
      const drawTime = new Date(Date.now() + 7200000);

      const res = await api.post("/games/startgame", {
        startTime,
        endTime,
        drawTime,
      });

      const newGame = res.data;
      setGames((prev) => [...prev, newGame]);
      setSelectedGame(newGame);
    } catch (err) {
      console.error("Failed to start game:", err);
    }
  };

  const handleEndGame = async () => {
    try {
      if (!selectedGame) return;
      const res = await api.patch(`/games/${selectedGame._id}/status`, {
        status: "closed",
      });

      const updated = res.data;
      setGames((prev) =>
        prev.map((g) => (g._id === updated._id ? updated : g))
      );
      setSelectedGame(updated);
    } catch (err) {
      console.error("Failed to end game:", err);
    }
  };

  const handleDeclareResults = async () => {
    if (!selectedGame) return;
    const openDigit = prompt("Enter open digit (0-9)");
    const closeDigit = prompt("Enter close digit (0-9)");

    if (!openDigit || !closeDigit) return;

    try {
      const res = await api.post(`/games/${selectedGame._id}/results`, {
        numbers: [parseInt(openDigit), parseInt(closeDigit)],
      });

      const updatedGame = res.data;
      setGames((prev) =>
        prev.map((g) => (g._id === updatedGame._id ? updatedGame : g))
      );
      setSelectedGame(updatedGame);
    } catch (err) {
      console.error("Failed to declare results:", err);
    }
  };

  if (loading) return <p className="text-center py-10">Loading dashboard...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Stats Overview */}
        <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <Activity size={24} />
                <span className="text-2xl font-bold">
                  ₹{games.reduce((a, g) => a + (g.totalAmount || 0), 0)}
                </span>
              </div>
              <p className="mt-2 text-purple-100">Total Revenue</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <Trophy size={24} />
                <span className="text-2xl font-bold">
                  ₹{games.reduce((a, g) => a + (g.totalPayouts || 0), 0)}
                </span>
              </div>
              <p className="mt-2 text-amber-100">Total Payouts</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <Users size={24} />
                <span className="text-2xl font-bold">{users.length}</span>
              </div>
              <p className="mt-2 text-green-100">Active Players</p>
            </CardContent>
          </Card>
        </div>

        {/* Game Controls */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold text-slate-800">
                Game Controls
              </h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 border border-slate-200 rounded-lg">
                  <h3 className="font-medium text-slate-700 mb-2">
                    Current Game
                  </h3>
                  {selectedGame ? (
                    <div className="flex items-center justify-between">
                      <p>
                        Draw Time:{" "}
                        {new Date(selectedGame.drawTime).toLocaleString()}
                      </p>
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          selectedGame.status === "closed"
                            ? "bg-red-100 text-red-800"
                            : selectedGame.status === "resulted"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {selectedGame.status}
                      </span>
                    </div>
                  ) : (
                    <p>No game selected</p>
                  )}
                </div>

                <div className="flex space-x-4">
                  <Button color="success" onClick={handleStartGame} fullWidth>
                    <Play size={16} className="mr-2" />
                    Start Game
                  </Button>
                  <Button
                    color="error"
                    onClick={handleEndGame}
                    disabled={!selectedGame}
                    fullWidth
                  >
                    <Pause size={16} className="mr-2" />
                    End Game
                  </Button>
                </div>

                <Button
                  color="primary"
                  onClick={handleDeclareResults}
                  disabled={!selectedGame}
                  fullWidth
                >
                  <Trophy size={16} className="mr-2" />
                  Declare Results
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
