import {
  BookTwoTone,
  FileImageTwoTone,
  FilePdfTwoTone,
  VideoCameraTwoTone,
} from "@ant-design/icons";
const iconstyle = {
  fontSize: "large",
  marginRight: 8,
};

export function getResourceIcon(type) {
  if (type === "link")
    return <BookTwoTone style={iconstyle} twoToneColor="#3F51B5" />;
  if (type === "img")
    return <FileImageTwoTone style={iconstyle} twoToneColor="#2196F3" />;
  if (type === "doc")
    return <FilePdfTwoTone style={iconstyle} twoToneColor="#cf1322" />;
  if (type === "vid")
    return <VideoCameraTwoTone style={iconstyle} twoToneColor="#4caf50" />;
}
