import Categories from "./Categories";
import { Sheep } from "./Sheep";

export default function SheepSection() {
  return (
    <section className="p-2 md:p-5 md:pe-0 grid grid-cols-1 gap-4 md:grid-cols-[1fr,0.01fr,2fr] ">
      <Categories />
      <div className="border-e border-border"></div>
      <Sheep />
    </section>
  );
}
