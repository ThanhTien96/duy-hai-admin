import { Editor } from "@tinymce/tinymce-react";
import { useAppSelector } from "store";

export type TTextEditorProps = {
  onChange: (value: string) => void;
  height?: number;
  defaultValue?: string;
};

const TextEditor = ({ onChange, height, defaultValue }: TTextEditorProps) => {
  const { selected } = useAppSelector((state) => state.app.theme);

  return (
    <>
      <Editor
        apiKey="wumtctoa4zi0a1l66upxgydpoqz6d9jqqw9d26a862f6gfia"
        onEditorChange={onChange}
        initialValue={defaultValue}
        init={{
          statusbar: false,
          borderRadius: 0,
          height: height ?? 500,
          width: "100%",
          menubar: true,
          content_css: selected,
          skin: selected === "dark" ? "oxide-dark" : "oxide",
          image_advtab: true,
          importcss_append: true,
          plugins: [
            "advlist",
            "importcss",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter | image |" +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px}",
        }}
      />
    </>
  );
};

export default TextEditor;
