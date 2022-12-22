import * as React from 'react';
import styles from './ReactTinymceText.module.scss';
import './workbench.css';
import { IReactTinymceTextProps } from './IReactTinymceTextProps';
import { IReactTinymceTextState } from './IReactTinymceTextState';
//import { escape } from '@microsoft/sp-lodash-subset';
import { Editor } from "@tinymce/tinymce-react";
import ReactHtmlParser from 'react-html-parser';


/**
 * TinyMCE Class that contains a TinyMCE Editor instance.
 * Takes the HTML stored in the WebPart,
 * the display mode of the webpart and either dislays
 * the HTML as HTML or displays the HTML inside the
 * tinyMCE rich text editor.
 * @export
 * @class ReactTinymceText
 * @extends {React.Component<IReactTinymceTextProps, IReactTinymceTextState>}
 */
export default class ReactTinymceText extends React.Component<IReactTinymceTextProps, IReactTinymceTextState> {

  /**
   * Creates an instance of ReactTinyMce.
   * Initializes the local version of tinymce.
   * @param {IReactTinymceTextProps} props 
   * @memberof ReactTinyMce
   */
  public constructor(props: IReactTinymceTextProps) {
    super(props);
    this.state = {
      content: this.props.content
    } as IReactTinymceTextState;
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * Renders the editor in read mode or edit mode depending
   * on the site page.
   * @returns {React.ReactElement<IReactTinymceTextProps>} 
   * @memberof ReactTinyMce
   */
  public render(): React.ReactElement<IReactTinymceTextProps> {
    return (
      <div className={ styles.reactTinymceText }> 
        {
          this.props.isReadMode
          ? this.renderReadMode()
          : this.renderEditMode()
        }
      </div>
    );
  }

  /**
   * Displays the Editor in read mode, for all users.
   * @private
   * @returns {React.ReactElement<IReactTinymceTextProps>} 
   * @memberof ReactTinyMce
   */
  private renderEditMode(): React.ReactElement<IReactTinymceTextProps> {
    
    return (
      <div className="tinyMceEditMode">
        <Editor
          apiKey="uev0atj3bxv4dp9wosz4bnt8i7r42m0axt9no14p39o0mmmu" 
          //initialValue="<p>This is the initial content of the editor.</p>"
          init={{
            language: 'de',
            height: 400,
            menubar: 'edit insert format table lists view',  // skip file
            plugins: 'link image table lists media code emoticons fullscreen wordcount',
              //'advlist autolink lists link image charmap print preview anchor',
              //'searchreplace visualblocks code fullscreen',
              //'insertdatetime media table paste code help wordcount'
            //toolbar: 'undo redo | formatselect | ' +
            //'bold italic backcolor | alignleft aligncenter ' +
            //'alignright alignjustify | bullist numlist outdent indent | ' +
            //'removeformat | help',
            toolbar: 'undo redo | styles | forecolor bold italic | alignleft aligncenter alignright | numlist bullist | link  media image | checklist | emoticons | code',
            table_default_styles: {
              'width': '100%',
              'height': 'auto'
            },
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }' +
                           'tbody { vertical-align: top }',
            image_advtab: true,
            /*style_formats: [
              {title: 'Headings', items: [
                  {title: 'Heading 1', format: 'h2'},
                  {title: 'Heading 2', format: 'h3'},
                  {title: 'Heading 3', format: 'h4'}
              ]}], */
              emoticons_append: {
                custom_check: {
                  keywords: ['check', 'ok', 'hacken'],
                  char: '✅'
                },
                custom_stop: {
                  keywords: ['stop', 'warnung'],
                  char: '⛔'
                },
                custom_hacken: {
                  keywords: ['check', 'hacken', 'ok'],
                  char: '✔'
                },
                custom_warn: {
                  keywords: ['warnung', 'warning'],
                  char: '⚠'
                }
              }
          }}
          initialValue={this.props.content} // {this.state.content}
          onChange={(event) => {this.handleChange(event.target.getContent());}}
          //onChange={(event) => {this.handleChange(event.target.getContent());}}
        />
      </div>
    );
  }

  /**
   * Displays the editor in edit mode for power users
   * who have access to click the edit button on the site page.
   * @private
   * @returns {React.ReactElement<any>} 
   * @memberof ReactTinyMce
   */
  private renderReadMode(): React.ReactElement<any> {
    return (
      <div className="tinyMceReadMode">
        {ReactHtmlParser(this.state.content)}
      </div>
    );
  }
  
  /**
   * Sets the state of the current TSX file and
   * invokes the saveRteContent callback with
   * the states content.
   * @private
   * @param {string} content 
   * @memberof ReactTinyMce
   */
  private handleChange(content: string): void {
    this.setState({content: content}, () => {
      this.props.saveRteContent(content);
    });
  }
}