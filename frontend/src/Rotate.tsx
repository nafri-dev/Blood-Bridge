import WordRotate from "./components/ui/word-rotate";

export function WordRotateDemo() {
  return (
    <WordRotate
      className=" mt-6 font-extrabold items-center text-center text-yellow text-6xl"
      words={["Cancer", "Heart attack", "Liver issues"]}
    />
  );
}
