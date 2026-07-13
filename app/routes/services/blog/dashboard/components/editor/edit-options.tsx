import {
	ArrowBendDownLeftIcon,
	ArrowUUpLeftIcon,
	ArrowUUpRightIcon,
	BracketsCurlyIcon,
	CodeIcon,
	HighlighterIcon,
	type Icon,
	ImageIcon,
	LinkIcon,
	ListBulletsIcon,
	ListChecksIcon,
	ListNumbersIcon,
	MinusIcon,
	ParagraphIcon,
	QuotesIcon,
	TextAlignCenterIcon,
	TextAlignJustifyIcon,
	TextAlignLeftIcon,
	TextAlignRightIcon,
	TextBIcon,
	TextHFiveIcon,
	TextHFourIcon,
	TextHThreeIcon,
	TextHTwoIcon,
	TextItalicIcon,
	TextStrikethroughIcon,
	TextSubscriptIcon,
	TextSuperscriptIcon,
	TextTIcon,
	TextTSlashIcon,
	TextUnderline as UnderlineIcon,
} from "@phosphor-icons/react"
import type { Editor } from "@tiptap/react"
import { Youtube } from "~/components/icons/youtube"

export interface EditOptionProps {
	name: string
	/** e.g., ctrl/mod+alt+shift */
	shortcut?: string
	icon: Icon
	isActive?: (editor: Editor) => boolean
	run: (editor: Editor) => void
	canRun: (editor: Editor) => boolean
}

const MarkOptions: EditOptionProps[] = [
	{
		name: "Bold",
		shortcut: "mod+b",
		icon: TextBIcon,
		isActive: (editor: Editor) => editor.isActive("bold"),
		run: (editor: Editor) => editor.chain().focus().toggleBold().run(),
		canRun: (editor: Editor) => editor.can().chain().focus().toggleBold().run(),
	},
	{
		name: "Italic",
		shortcut: "mod+i",
		icon: TextItalicIcon,
		isActive: (editor: Editor) => editor.isActive("italic"),
		run: (editor: Editor) => editor.chain().focus().toggleItalic().run(),
		canRun: (editor: Editor) =>
			editor.can().chain().focus().toggleItalic().run(),
	},
	{
		name: "Underline",
		shortcut: "mod+u",
		icon: UnderlineIcon,
		isActive: (editor: Editor) => editor.isActive("underline"),
		run: (editor: Editor) => editor.chain().focus().toggleUnderline().run(),
		canRun: (editor: Editor) =>
			editor.can().chain().focus().toggleUnderline().run(),
	},
	{
		name: "Strikethrough",
		shortcut: "mod+shift+s",
		icon: TextStrikethroughIcon,
		isActive: (editor: Editor) => editor.isActive("strike"),
		run: (editor: Editor) => editor.chain().focus().toggleStrike().run(),
		canRun: (editor: Editor) =>
			editor.can().chain().focus().toggleStrike().run(),
	},
	{
		name: "Code",
		shortcut: "mod+e",
		icon: CodeIcon,
		isActive: (editor: Editor) => editor.isActive("code"),
		run: (editor: Editor) => editor.chain().focus().toggleCode().run(),
		canRun: (editor: Editor) => editor.can().chain().focus().toggleCode().run(),
	},
]

const SubSuperScriptOptions: EditOptionProps[] = [
	{
		name: "Superscript",
		shortcut: "mod+.",
		icon: TextSuperscriptIcon,
		isActive: (editor: Editor) => editor.isActive("superscript"),
		run: (editor: Editor) => editor.chain().focus().toggleSuperscript().run(),
		canRun: (editor: Editor) =>
			editor.can().chain().focus().toggleSuperscript().run(),
	},
	{
		name: "Subscript",
		shortcut: "mod+,",
		icon: TextSubscriptIcon,
		isActive: (editor: Editor) => editor.isActive("subscript"),
		run: (editor: Editor) => editor.chain().focus().toggleSubscript().run(),
		canRun: (editor: Editor) =>
			editor.can().chain().focus().toggleSubscript().run(),
	},
]

const createHighlightOption = ({
	name,
	color,
}: {
	name: string
	color: string
}): EditOptionProps & { color: string } => ({
	name: name,
	shortcut: "mod+shift+h",
	icon: HighlighterIcon,
	isActive: (editor) => editor.isActive("highlight", { color }),
	run: (editor: Editor) => editor.chain().focus().setHighlight({ color }).run(),
	canRun: (editor: Editor) =>
		editor.can().chain().focus().setHighlight({ color }).run(),
	color,
})

const createColorOption = ({
	name,
	color,
}: {
	name: string
	color: string
}): EditOptionProps & { color: string } => ({
	name: name,
	icon: TextTIcon,
	isActive: (editor) => editor.isActive("textStyle", { color }),
	run: (editor: Editor) => editor.chain().focus().setColor(color).run(),
	canRun: (editor: Editor) =>
		editor.can().chain().focus().setColor(color).run(),
	color,
})

const createFontFamilyOption = (fontFamily: string): EditOptionProps => ({
	name: "Font Family",
	icon: TextTIcon,
	run: (editor: Editor) =>
		editor.chain().focus().setFontFamily(fontFamily).run(),
	canRun: (editor: Editor) =>
		editor.can().chain().focus().setFontFamily(fontFamily).run(),
})

const RemoveFormattingOption: EditOptionProps = {
	name: "Remove Formatting",
	icon: TextTSlashIcon,
	run: (editor: Editor) => editor.chain().focus().unsetAllMarks().run(),
	canRun: () => true,
}

const ParagraphOptions: EditOptionProps[] = [
	{
		name: "Paragraph",
		shortcut: "mod+alt+0",
		icon: ParagraphIcon,
		isActive: (editor: Editor) => editor.isActive("paragraph"),
		run: (editor: Editor) => editor.chain().focus().setParagraph().run(),
		canRun: () => true,
	},
	{
		name: "Heading 2",
		shortcut: "mod+alt+2",
		icon: TextHTwoIcon,
		isActive: (editor: Editor) => editor.isActive("heading", { level: 2 }),
		run: (editor: Editor) =>
			editor.chain().focus().toggleHeading({ level: 2 }).run(),
		canRun: () => true,
	},
	{
		name: "Heading 3",
		shortcut: "mod+alt+3",
		icon: TextHThreeIcon,
		isActive: (editor: Editor) => editor.isActive("heading", { level: 3 }),
		run: (editor: Editor) =>
			editor.chain().focus().toggleHeading({ level: 3 }).run(),
		canRun: () => true,
	},
	{
		name: "Heading 4",
		shortcut: "mod+alt+4",
		icon: TextHFourIcon,
		isActive: (editor: Editor) => editor.isActive("heading", { level: 4 }),
		run: (editor: Editor) =>
			editor.chain().focus().toggleHeading({ level: 4 }).run(),
		canRun: () => true,
	},
	{
		name: "Heading 5",
		shortcut: "mod+alt+5",
		icon: TextHFiveIcon,
		isActive: (editor: Editor) => editor.isActive("heading", { level: 5 }),
		run: (editor: Editor) =>
			editor.chain().focus().toggleHeading({ level: 5 }).run(),
		canRun: () => true,
	},
]

const AdvancedParagraphOptions: EditOptionProps[] = [
	{
		name: "Blockquote",
		shortcut: "mod+shift+b",
		icon: QuotesIcon,
		isActive: (editor: Editor) => editor.isActive("blockquote"),
		run: (editor: Editor) => editor.chain().focus().toggleBlockquote().run(),
		canRun: (editor: Editor) =>
			editor.can().chain().focus().toggleBlockquote().run(),
	},
	{
		name: "Code Block",
		shortcut: "mod+alt+c",
		icon: BracketsCurlyIcon,
		isActive: (editor: Editor) => editor.isActive("codeBlock"),
		run: (editor: Editor) => editor.chain().focus().toggleCodeBlock().run(),
		canRun: (editor: Editor) =>
			editor.can().chain().focus().toggleCodeBlock().run(),
	},
]

const ListOptions: EditOptionProps[] = [
	{
		name: "Ordered List",
		shortcut: "mod+shift+7",
		icon: ListNumbersIcon,
		isActive: (editor: Editor) => editor.isActive("orderedList"),
		run: (editor: Editor) => editor.chain().focus().toggleOrderedList().run(),
		canRun: () => true,
	},
	{
		name: "Bullet List",
		shortcut: "mod+shift+8",
		icon: ListBulletsIcon,
		isActive: (editor: Editor) => editor.isActive("bulletList"),
		run: (editor: Editor) => editor.chain().focus().toggleBulletList().run(),
		canRun: () => true,
	},
	{
		name: "Check List",
		shortcut: "mod+shift+9",
		icon: ListChecksIcon,
		isActive: (editor: Editor) => editor.isActive("taskList"),
		run: (editor: Editor) => editor.chain().focus().toggleTaskList().run(),
		canRun: () => true,
	},
]

const AlignOptions: EditOptionProps[] = [
	{
		name: "Align Left",
		shortcut: "mod+shift+i",
		icon: TextAlignLeftIcon,
		isActive: (editor: Editor) => editor.isActive({ textAlign: "left" }),
		run: (editor: Editor) =>
			editor.chain().focus().toggleTextAlign("left").run(),
		canRun: () => true,
	},
	{
		name: "Align Center",
		shortcut: "mod+shift+e",
		icon: TextAlignCenterIcon,
		isActive: (editor: Editor) => editor.isActive({ textAlign: "center" }),
		run: (editor: Editor) =>
			editor.chain().focus().toggleTextAlign("center").run(),
		canRun: () => true,
	},
	{
		name: "Align Right",
		shortcut: "mod+shift+r",
		icon: TextAlignRightIcon,
		isActive: (editor: Editor) => editor.isActive({ textAlign: "right" }),
		run: (editor: Editor) =>
			editor.chain().focus().toggleTextAlign("right").run(),
		canRun: () => true,
	},
	{
		name: "Justify",
		shortcut: "mod+shift+j",
		icon: TextAlignJustifyIcon,
		isActive: (editor: Editor) => editor.isActive({ textAlign: "justify" }),
		run: (editor: Editor) =>
			editor.chain().focus().toggleTextAlign("justify").run(),
		canRun: () => true,
	},
]

const MiscOptions: EditOptionProps[] = [
	{
		name: "Separator",
		icon: MinusIcon,
		run: (editor: Editor) => editor.chain().focus().setHorizontalRule().run(),
		canRun: () => true,
	},
	{
		name: "Hard Break",
		shortcut: "mod/shift+enter",
		icon: ArrowBendDownLeftIcon,
		run: (editor: Editor) => editor.chain().focus().setHardBreak().run(),
		canRun: () => true,
	},
]

const UndoRedoOptions: EditOptionProps[] = [
	{
		name: "Undo",
		shortcut: "mod+z",
		icon: ArrowUUpLeftIcon,
		run: (editor: Editor) => editor.chain().focus().undo().run(),
		canRun: (editor: Editor) => editor.can().chain().focus().undo().run(),
	},
	{
		name: "Redo",
		shortcut: "mod+shift+z",
		icon: ArrowUUpRightIcon,
		run: (editor: Editor) => editor.chain().focus().redo().run(),
		canRun: (editor: Editor) => editor.can().chain().focus().redo().run(),
	},
]

// LinkUnlink Image Video
const createLinkUnlinkOption = (href?: string) => ({
	name: "Link/Unlink",
	shortcut: "mod+k",
	icon: LinkIcon,
	isActive: (editor: Editor) => editor.isActive("link"),
	run: (editor: Editor) =>
		editor
			.chain()
			.focus()
			.toggleLink(href ? { href } : undefined)
			.run(),
	canRun: (editor: Editor) =>
		editor
			.can()
			.chain()
			.focus()
			.toggleLink(href ? { href } : undefined)
			.run(),
})

export type SetImageOptions = Parameters<Editor["commands"]["setImage"]>[0]
const createImageOption = (props?: SetImageOptions) => ({
	name: "Image",
	shortcut: "mod+shift+i",
	icon: ImageIcon,
	isActive: (editor: Editor) => editor.isActive("image"),
	run: (editor: Editor) =>
		props ? editor.chain().focus().setImage(props).run() : false,
	canRun: (editor: Editor) =>
		props ? editor.can().chain().focus().setImage(props).run() : false,
})

export type SetYoutubeVideoOptions = Parameters<
	Editor["commands"]["setYoutubeVideo"]
>[0]
const createYoutubeOption = (props?: SetYoutubeVideoOptions) => ({
	name: "Youtube",
	icon: Youtube,
	isActive: (editor: Editor) => editor.isActive("youtube"),
	run: (editor: Editor) =>
		props ? editor.chain().focus().setYoutubeVideo(props).run() : false,
	canRun: (editor: Editor) =>
		props ? editor.can().chain().focus().setYoutubeVideo(props).run() : false,
})

export {
	AdvancedParagraphOptions,
	AlignOptions,
	createColorOption,
	createFontFamilyOption,
	createHighlightOption,
	createImageOption,
	createLinkUnlinkOption,
	createYoutubeOption,
	ListOptions,
	MarkOptions,
	MiscOptions,
	ParagraphOptions,
	RemoveFormattingOption,
	SubSuperScriptOptions,
	UndoRedoOptions,
}
