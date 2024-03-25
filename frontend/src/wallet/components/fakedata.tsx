import { Item } from "./format";

const fakeWalletTransactions: Item[] = [
    {
      time: "2024-03-17T12:00:00Z",
      status: "Successful",
      transactionId: "a1b2c3d4e5f67890",
      amount: 1500.00,
      type: 'send',
    },
    {
      time: "2024-03-17T09:30:00Z",
      status: "Pending",
      transactionId: "b2c3d4e5f67890a1",
      amount: 200.00,
      type: 'send'
    },
    {
      time: "2024-03-16T15:45:00Z",
      status: "Failed",
      transactionId: "c3d4e5f67890a1b2",
      amount: 75.50,
      type: 'request',
    },
    {
      time: "2024-03-16T18:20:00Z",
      status: "Successful",
      transactionId: "d4e5f67890a1b2c3",
      amount: 1250.00,
      type: 'send',
    },
    {
      time: "2024-03-15T10:15:00Z",
      status: "Successful",
      transactionId: "e5f67890a1b2c3d4",
      amount: 500.00,
      type: 'request',
    },
    {
      time: "2024-03-15T22:05:00Z",
      status: "Failed",
      transactionId: "f67890a1b2c3d4e5",
      amount: 300.00,
      type: 'send',
    },
    {
      time: "2024-03-14T08:00:00Z",
      status: "Pending",
      transactionId: "67890a1b2c3d4e5f",
      amount: 100.00,
      type: 'send',
    },
    {
      time: "2024-03-14T16:45:00Z",
      status: "Successful",
      transactionId: "7890a1b2c3d4e5f6",
      amount: 800.00,
      type: 'request',
    },
    {
      time: "2024-03-13T13:30:00Z",
      status: "Successful",
      transactionId: "890a1b2c3d4e5f67",
      amount: 400.00,
      type: 'send',
    },
    {
      time: "2024-03-13T19:55:00Z",
      status: "Failed",
      transactionId: "90a1b2c3d4e5f678",
      amount: 950.00,
      type: 'request',
    },
  ];
  
  export default fakeWalletTransactions;