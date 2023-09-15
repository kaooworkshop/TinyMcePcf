import * as React from 'react';
import { Editor } from "@tinymce/tinymce-react";

    export interface IRichTextProps  {
        richtext?: string;
        richtextChanged?: (value: string) => void;
        apiKey?: string;
        isRichTextDisabled?: boolean;
    }

    export interface IRichTextState extends React.ComponentState {
        value: string;
    }

   

    export class RichText extends React.Component<IRichTextProps,IRichTextState> {
       
        constructor(props: IRichTextProps) {
            super(props);
            this.state = {value: this.props.richtext ?? ''};
        }

        private onEditorChange = (content: string, editor: any) => {
            this.setState({value: content});

            if (this.props.richtextChanged){
            this.props.richtextChanged(content);
            }
        }

        componentDidUpdate(prevProps: Readonly<IRichTextProps>, prevState: Readonly<IRichTextState>, snapshot?: any): void {
            if (this.props.richtext !== prevProps.richtext) {
                this.setState({value: this.props.richtext ?? ''});
            }
        }

        public render(): React.ReactNode {
            
            return (
                <Editor
                    apiKey= {this.props.apiKey} 
                    //initialValue={this.props.richtext}
                    value={this.state.value}
                    disabled={this.props.isRichTextDisabled}
                    init={{
                         // setup tinymce
                         resize: false,
                         //readonly: !this.props.stateCode ?? false,                        
                         promotion: false, // hide the tinymce website link
                         menubar: false,
                         
                         // setup buttons
                         toolbar: [
                             'Undo Redo |Fontfamily Fontsize forecolor |bold italic strikethrough underline|aligncenter alignjustify alignleft alignnone alignright | outdent indent | bullist numlist | backcolor',
                             'remove selectall removeformat | visualchars visualblocks  | link | Insertdatetime |  h1 h2 h3 h4 h5 h6'],
                         width: '100%',
                         height: 500,
                         plugins: [
                             "powerpaste",
                             "autolink",
                             "charmap",
                             "link",
                             "lists",
                             "nonbreaking",
                             "insertdatetime",
                             "visualblocks	",
                             "searchreplace",
                             "preview",
                             "visualchars",
                             "media",
                             "anchor",
                             "advlist",
                             "accordion",
                             "code",
                             "directionality",
                             "fullscreen",
                             "image",
                             "importcss",
                             "wordcount",
 
                         ],
                         statusbar: false,
                         powerpaste_word_import: "merge", // paste from word without removing formatting
                         browser_spellcheck: true,
                    }}
                    onEditorChange={this.onEditorChange}
                />
            )
        }
    }

         
