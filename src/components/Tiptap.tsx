"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";

interface Props {
    description: string;
    onChange: (richText: string) => void;
}

const Tiptap = ({ description, onChange }: Props) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure(),
            OrderedList.configure({ keepMarks: true }),
            ListItem,
        ],
        content: description,
        editorProps: {
            attributes: {
                class: "h-[10rem] overflow-y-auto rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            },
        },
        onUpdate: ({ editor }) => onChange(editor.getHTML()),
    });

    return (
        <div className="flex flex-col w-full gap-2">
            <Toolbar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
};

export default Tiptap;

// import Document from "@tiptap/extension-document";
// import ListItem from "@tiptap/extension-list-item";
// import OrderedList from "@tiptap/extension-ordered-list";
// import Paragraph from "@tiptap/extension-paragraph";
// import Text from "@tiptap/extension-text";
// import { EditorContent, useEditor } from "@tiptap/react";
// import React from "react";

// const Tiptap = () => {
//     const editor = useEditor({
//         extensions: [
//             Document,
//             Paragraph,
//             Text,
//             OrderedList.configure({ keepMarks: true }),
//             ListItem,
//         ],
//         content: `
//         <ol>
//           <li>A list item</li>
//           <li>And another one</li>
//         </ol>

//         <ol start="5">
//           <li>This item starts at 5</li>
//           <li>And another one</li>
//         </ol>
//       `,
//     });

//     if (!editor) {
//         return null;
//     }

//     return (
//         <>
//             <button
//                 onClick={() => editor.chain().focus().toggleOrderedList().run()}
//                 className={editor.isActive("orderedList") ? "is-active" : ""}
//             >
//                 toggleOrderedList
//             </button>
//             <button
//                 onClick={() =>
//                     editor.chain().focus().splitListItem("listItem").run()
//                 }
//                 disabled={!editor.can().splitListItem("listItem")}
//             >
//                 splitListItem
//             </button>
//             <button
//                 onClick={() =>
//                     editor.chain().focus().sinkListItem("listItem").run()
//                 }
//                 disabled={!editor.can().sinkListItem("listItem")}
//             >
//                 sinkListItem
//             </button>
//             <button
//                 onClick={() =>
//                     editor.chain().focus().liftListItem("listItem").run()
//                 }
//                 disabled={!editor.can().liftListItem("listItem")}
//             >
//                 liftListItem
//             </button>

//             <EditorContent editor={editor} />
//         </>
//     );
// };

// export default Tiptap;
