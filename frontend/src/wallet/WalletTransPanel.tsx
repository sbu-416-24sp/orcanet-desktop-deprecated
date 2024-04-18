import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import QRCode from "react-qr-code";

interface displayControllerProps {
  display: string;
  setDisplay: React.Dispatch<React.SetStateAction<string>>;
  text?: string;
}

interface FormInputContainerProps {
  className?: string;
  title: string;
}

function DisplayButton({ display, setDisplay, text }: displayControllerProps) {
  return (
    <div
      className={`h-fit cursor-pointer transition-all duration-300 ${
        display === text ? "border-b-2 border-b-indigo-500" : ""
      }`}
      onClick={() => setDisplay(text ? text : "Send")}
    >
      {text}
    </div>
  );
}

function DisplayController({ display, setDisplay }: displayControllerProps) {
  return (
    <div className="flex font-semibold gap-5 ">
      <DisplayButton display={display} setDisplay={setDisplay} text="Send" />
      <DisplayButton display={display} setDisplay={setDisplay} text="Code" />
    </div>
  );
}

function TransferPanelHeader({ display, setDisplay }: displayControllerProps) {
  return (
    <div className="flex justify-between">
      <h3 className="text-stone-900 text-xl font-bold">Transfer</h3>
      <DisplayController display={display} setDisplay={setDisplay} />
    </div>
  );
}

function FormInputContainer({ className, title }: FormInputContainerProps) {
  return (
    <div className={className}>
      <h3 className="text-stone-900 text-md font-semibold">{title}</h3>
      <Input
        id={title.replaceAll(" ", "-").toLowerCase()}
        type={title === "Amount" ? "number" : "text"}
        className="border border-stone-900 rounded-lg px-3 py-5 w-full mt-2"
      />
    </div>
  );
}

function QRCodeContainer() {
  return (
    <div className="flex justify-center mt-5">
      <QRCode value="13hgriwdGXvPyWFABDX6QByyxvN8cWCgDp" />
    </div>
  );
}

function SendForm() {
  const input = [
    { className: "col-span-2", title: "Receiver ID" },
    { title: "Amount" },
    { title: "Reason" },
  ];

  async function send() {
    const amount = (document.getElementById("amount") as HTMLInputElement)
      .value;
    const receiverId = (
      document.getElementById("receiver-id") as HTMLInputElement
    ).value;
    const reason = (document.getElementById("reason") as HTMLInputElement)
      .value;

    alert(`Sending ${amount} ORC to ${receiverId} with reason: ${reason}`);
  }

  return (
    <div className="px-3 mt-7">
      <div className="grid grid-cols-2 grid-rows-2 gap-5">
        {input.map((input) => (
          <FormInputContainer
            key={input.title}
            className={input.className}
            title={input.title}
          />
        ))}
      </div>
      <Button
        className="mt-7 bg-indigo-500 text-white px-7"
        form="send-form"
        type="submit"
        onClick={send}
      >
        Send
      </Button>
    </div>
  );
}

export default function WalletTransPanel() {
  const [display, setDisplay] = useState("Send");

  return (
    <div className="bg-white p-5 rounded-lg">
      <TransferPanelHeader display={display} setDisplay={setDisplay} />
      {display === "Send" ? <SendForm /> : <QRCodeContainer />}
    </div>
  );
}
