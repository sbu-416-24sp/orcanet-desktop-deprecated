export type Peer = {
  location: string;
  latency: number;
  peerId: string;
  connection: string;
};

export const peerData: Peer[] = [
  {
    location: "USA, New York",
    latency: 5,
    peerId: "12D3KooWG3H1cpSekZvYYZq7BzBLeQVKtb1H7ipGSYKetA4BiWXN",
    connection:
      "/ip4/137.184.102.144/udp/4001/quic-v1/p2p/12D3KooWG3H1cpSekZvYYZq7BzBLeQVKtb1H7ipGSYKetA4BiWXN",
  },
  {
    location: "China, Chongqing",
    latency: 10,
    peerId: "12D3KooWSUVz2FmcgC5x9Wt8bU1b6VHSunpZTaeBtqEjd4NiFEdq",
    connection:
      "/ip4/154.53.33.68/udp/4001/quic-v1/p2p/12D3KooWL3BJxY4L5VC5CUTWSrCjLjrHxygxSfYp64dspQertBuu",
  },
  {
    location: "England, London",
    latency: 7,
    peerId: "12D3KooWSUVz2FmcgC5x9Wt8bU1b6VHSunpZTaeBtqEjd4NiFEdq",
    connection:
      "/ip4/154.53.33.68/udp/4001/quic-v1/p2p/12D3KooWL3BJxY4L5VC5CUTWSrCjLjrHxygxSfYp64dspQertBuu",
  },
];
