import type { Metadata } from "next";
import CreateWizard from "./CreateWizard";

export const metadata: Metadata = {
  title: "Создать открытку — MeetMaker",
};

export default function CreatePage() {
  return <CreateWizard />;
}
