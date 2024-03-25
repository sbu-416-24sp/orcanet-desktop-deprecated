//Modal.tsx
import React from 'react';
import ReactModal from 'react-modal';
import {Item} from './format'
interface ModalProps {
 isOpen: boolean;
 onClose: () => void;
 onSubmit: (username: string, amount: number) => void;
 modalType: 'send' | 'request';
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, modalType }) => {
 const [username, setUsername] = React.useState('');
 const [amount, setAmount] = React.useState(0);

 const handleSubmit = () => {
    onSubmit(username, amount);
    onClose();
 };

 return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      parentSelector={() => document.getElementById('send-receive-buttons') || document.body}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#fefefe', 
          borderRadius: '10px',
          padding: '40px',
          width: '30%', 
          height: 'auto', 
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)', 
        },
      }}
    >
      <h2 className="text-2xl font-bold text-center mb-4">{modalType === 'send' ? 'Send Money' : 'Request Money'}</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {modalType === 'send' ? 'Send to:' : 'Request from:'}
        </label>

        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder={modalType === 'send' ? "0x  " : "0x "}
          onChange={(e) => setUsername(e.target.value)}
        />
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Amount:
      </label>
      <input
        type="number"
        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      </div>
      <button onClick={handleSubmit} className="mr-2 bg-green-600 text-white py-2 px-6 rounded-full text-lg cursor-pointer hover:bg-green-700">Submit</button>
      <button onClick={onClose} className="bg-red-500 text-white py-2 px-6 rounded-full text-lg cursor-pointer hover:bg-red-600">Cancel</button>
    </ReactModal>
 );
};

export default Modal;
