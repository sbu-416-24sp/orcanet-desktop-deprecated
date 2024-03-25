// WalletPage.tsx

import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { DataTable } from './components/table';
import { columns } from './components/format';
import fakeItems from './components/fakedata';
import Modal from './components/Modal';
import './WalletPage.css';
//import { Item } from 'src/store/columns';
import {Item} from './components/format';

const WalletPage = () => {
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [modalType, setModalType] = useState<'send' | 'request'>('send');
 const [transactions, setTransactions] = useState(fakeItems); // Manage transactions state

 const handleOpenModal = (type: 'send' | 'request') => {
    setModalType(type);
    setIsModalOpen(true);
 };

 const handleCloseModal = () => {
    setIsModalOpen(false);
 };

 const handleSubmitModal = (username: string, amount: number) => {
    const newTransaction: Item ={
      status: 'Successful',
      time: new Date().toISOString(),
      transactionId: Math.random().toString(36).substring(2, 15),
      amount,
      type: modalType,
    };
    setTransactions([newTransaction, ...transactions]); // Add new transaction
    handleCloseModal();
 
  if (modalType === 'request') {

    console.log(`Requested amount: ${amount}`);
  }
 };
 const sortedTransactions = [...transactions].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
 

 return (
    <div id="store-page">
      <div className="top-section">
        <div className="qr-code-container">
          <QRCode value={`bitcoin:${Math.random().toString(36).substring(2, 15)}`} />
        </div>
        <div className="send-receive-buttons">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={() => handleOpenModal('send')}>Send</button>
          <button className="px-4 py-2 ml-2 bg-green-500 text-white rounded hover:bg-green-700" onClick={() => handleOpenModal('request')}>Request</button>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitModal}
        modalType={modalType}
      />
      <DataTable columns={columns} data={sortedTransactions} />
    </div>
 );
};

export default WalletPage;
