import React, { useMemo, useState } from "react";
import {
  EditablePlugins,
  HeadingPlugin,
  ImagePlugin,
  ParagraphPlugin,
  pipe,
  PreviewPlugin,
  withImageUpload,
  withSelectOnBackspace,
} from "@udecode/slate-plugins";
import { createEditor } from "slate";
import { withHistory } from "slate-history";
import { Slate, withReact } from "slate-react";

const withPlugins = [withReact, withHistory, withImageUpload()];

function App() {
  const plugins = [
    ParagraphPlugin({}),
    HeadingPlugin({}),
    PreviewPlugin(),
    ImagePlugin(),
    withSelectOnBackspace({ allow: ["image", "img"] }),
  ];

  const createReactEditor = () => () => {
    const [value, setValue] = useState([
      {
        type: "paragraph",
        children: [
          {
            text: "",
          },
        ],
      },
    ]);

    const editor = useMemo(() => pipe(createEditor(), ...withPlugins), []);

    return (
      <Slate
        editor={editor}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      >
        <EditablePlugins
          plugins={plugins}
          placeholder="Write some markdown..."
        />
      </Slate>
    );
  };

  const Editor = createReactEditor();

  return (
    <div>
      <h1>asdasd</h1>
      <Editor />
    </div>
  );
}

export default App;
