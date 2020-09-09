import React, { Component, useState, useCallback, useEffect } from "react";
import { render } from "react-dom";
import { settings } from "carbon-components";
import { withRouter } from "react-router-dom"
import StreamHeader from '../stream/common/streamHeader/StreamHeader';
import {
    Form,
    FormGroup,
    Button,
    TextArea,
    TextInput,
    RadioButtonGroup,
    FileUploaderItem,
    FileUploaderDropContainer,
    FormItem
} from 'carbon-components-react';
import { ProgressIndicator, ProgressStep } from 'carbon-components-react';
import { CheckmarkOutline32 } from '@carbon/icons-react';
import "./style.scss";
import { Console } from "winston/lib/winston/transports";

let lastId = 0;
let data1;
function data(a) {
   data1 = a;
  console.log(data1);
}

function uid(prefix = "id") {
  lastId++;
  return `${prefix}${lastId}`;
}
const { prefix } = settings;

function FileUpload(props) {
  const [files, setFiles] = useState([]);
  const handleDrop = e => {
    e.preventDefault();
  };
  const handleDragover = e => {
    e.preventDefault();
  };
  useEffect(() => {
    document.addEventListener("drop", handleDrop);
    document.addEventListener("dragover", handleDragover);
    return () => {
      document.removeEventListener("drop", handleDrop);
      document.removeEventListener("dragover", handleDragover);
    };
  }, []);
  const uploadFile = async fileToUpload => {
    // file size validation
    if (fileToUpload.filesize > 512000) {
      const updatedFile = {
        ...fileToUpload,
        status: "edit",
        iconDescription: "Delete file",
        invalid: true,
        errorSubject: "File size exceeds limit",
        errorBody: "500kb max file size. Select a new file and try again."
      };
      setFiles(files =>
        files.map(file =>
          file.uuid === fileToUpload.uuid ? updatedFile : file
        )
      );
      return;
    }
    try {
      const response = await fetch(
        "https://www.mocky.io/v2/5185415ba171ea3a00704eed?mocky-delay=1000ms",
        {
          method: "POST",
          mode: "cors",
          body: fileToUpload
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const updatedFile = {
        ...fileToUpload,
        status: "complete",
        iconDescription: "Upload complete"
      };
      setFiles(files =>
        files.map(file =>
          file.uuid === fileToUpload.uuid ? updatedFile : file
        )
      );

      // show x icon after 1 second
      setTimeout(() => {
        const updatedFile = {
          ...fileToUpload,
          status: "edit",
          iconDescription: "Remove file"
        };
        setFiles(files =>
          files.map(file =>
            file.uuid === fileToUpload.uuid ? updatedFile : file
          )
        );
      }, 1000);
    } catch (error) {
      const updatedFile = {
        ...fileToUpload,
        status: "edit",
        iconDescription: "Upload failed",
        invalid: true
      };
      setFiles(files =>
        files.map(file =>
          file.uuid === fileToUpload.uuid ? updatedFile : file
        )
      );
      console.log(error);
    }
  };
  const onAddFiles = useCallback(
    (evt, { addedFiles }) => {
      evt.stopPropagation();
      const newFiles = addedFiles.map(file => ({
        uuid: uid(),
        name: file.name,
        filesize: file.size,
        status: "uploading",
        iconDescription: "Uploading"
      }));
      if (props.multiple) {
        setFiles([...files, ...newFiles]);
        newFiles.forEach(uploadFile);
      } else if (newFiles[0]) {
        setFiles([newFiles[0]]);
        uploadFile(newFiles[0]);
      }
    },
    [files, props.multiple],
    data(files)
  );
  const handleFileUploaderItemClick = useCallback(
    (evt, { uuid: clickedUuid }) =>
      setFiles(files.filter(({ uuid }) => clickedUuid !== uuid)),
    [files]
  );

  return (
    <FormItem>
      <h4 className="files-attched">
         {files.length >= 1 ? <span>{files.length} Files Attached</span> : <span className="noFilesAttached">Attach File (Optional)</span>}
      </h4>
      <FileUploaderDropContainer {...props} onAddFiles={onAddFiles} />
      <div className="uploaded-files" style={{ width: "100%" }}>
        {files.map(
          ({
            uuid,
            name,
            filesize,
            status,
            iconDescription,
            invalid,
            ...rest
          }) => (
            <FileUploaderItem
              key={uid()}
              uuid={uuid}
              name={name}
              filesize={filesize}
              size="default"
              status={status}
              iconDescription={iconDescription}
              invalid={invalid}
              onDelete={handleFileUploaderItemClick}
              {...rest}
            />
          )
        )}
      </div>
    </FormItem>
  );
}

const items = [
    {
        id: 'pam-gr',
        text: 'PAM General Request',
    },
    {
        id: 'pam-ptpa',
        text: 'PAM Provide Temporary Privileged Access',
    },
    {
        id: 'pam-pota',
        text: 'PAM Provide One-Time Access',
    }
];

const severityLevel = [
    {
        id: 'p1',
        text: 'P1 - Critical Production Stopped',
    },
    {
        id: 'p2',
        text: 'P2 - Severe Loss of Service',
    },
    {
        id: 'p3',
        text: 'P3 - Minor Loss of Service',
    }
];

class NewRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            show: true,
            disable: true,
            disableSubmitBtn: true,
            request: "",
            ticketID: "",
            radio1: false,
            radio2: false,
            pageTitle: "New Request: Privileged Access Management",
            opened:false,
            showDiv:true,

            textArea: " ",
            yes: "SEV1",
            no: "SEV4",
            referenceID: '',
            issueType: "SR - General Ticket",
            nature: "Service Request",
            service: "Identity Access Management",
            customerId: "P000000615"
        };
    }
     
      // handleChangeSeverity = e => {
      //   this.setState({ 
      //     textArea: e.target.value, 
      //    });
      // }

      handleRadioClick = event => {
        this.setState({ yes: event.target.value })
      }
    
    handleClickNext = (e) => {
        this.setState({ value: this.state.value + 1 });
    }
    handleClickBack = (e) => {
        this.setState({
            value: this.state.value - 1,
            pageTitle:"New Request: Privileged Access Management"
        });
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            referenceID: e.target.value
        })
    }
    handleChangevalue = e => {
      this.setState({
        [e.target.name]: e.target.value,
        textArea: e.target.value
      })
    }

    handleRadioClick = () => {
      if(this.state.radio2 !=false) {
        this.setState({radio2:false})
      }else if(this.state.radio1 !=false){
        this.setState({radio1:false})
      }
    }
    // handleRadiofalseClick = () => {
    //     this.setState({
    //         radio1:false
    //     })
    // }
    handleclickk = () => {
        this.props.history.push("new-ticket?type=request")
    }
  handleradioChange=(event)=>{
      this.setState({
          [event.target.name]:event.target.checked
      })
  }
  handleCreateRequest =(e) => {
    this.setState({pageTitle: "Request submitted"})
    const { opened, showDiv } = this.state;
		this.setState({
			opened: !opened,
    });
    this.setState({
			showDiv: !showDiv,
    });
    //  add post
    const user = {
      textArea: this.state.textArea,
      yes: this.state.yes,
      no: this.state.no,
      referenceID: this.state.referenceID,
      issueType: this.state.issueType,
      nature: this.state.nature,
      service: this.state.service,
      customerId: this.state.customerId
      };
      fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'post',
      headers: {    
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user })
    });
  }

    render() {
        const { request, ticketID } = this.state
        const enabled = request.length > 0  && (this.state.radio1 == true || this.state.radio2 == true)
        const info = this.state.radio1 == true ? "yes" : "No"
        const filelist = data1
        return (
            <>
                <StreamHeader title="PAM Services" pageName={this.state.pageTitle} streamType="new-request" />
                {this.state.showDiv && (<div className="creat-new-request-form">
                    <div class="bx--grid p-0">
                        <div class="bx--row">
                            <div class="bx--col-md-2">
                                <div className="ProgressIndicator">
                                    <div className="request-step-section">
                                        <h4>Request Steps</h4>
                                        <p>It only takes a moment</p>
                                    </div>
                                    <ProgressIndicator vertical currentIndex={this.state.value}>
                                        <ProgressStep label="Describe the Request" />
                                        <ProgressStep label="Summary" />
                                    </ProgressIndicator>
                                </div>
                            </div>
                            <div class="bx--col-md-6 progress-undicator-container-border-left">
                                <div className="progressIndicator-container">
                                    {this.state.value === 0 && (<div className="tab" >

                                        <Form>
                                            <div className="bx--col-md-6">
                                            <h4>Describe the Request</h4>
                                                <FormGroup >
                                                    <TextArea
                                                        cols={50}
                                                        id="test5"
                                                        invalidText="Invalid error message."
                                                        labelText="Request"
                                                        placeholder="Required"
                                                        rows={4}
                                                        onClick={this.handleChangeSubmitBtn}
                                                        onChange={this.handleChangeSeverity}
                                                        name="request"
                                                        onChange={this.handleChangevalue}
                                                        value={this.state.request}
                                                    />
                                                </FormGroup>

                                                <FormGroup legendText="Is this issue critically impacting your production enviroment" >

                                                    <div class="radio-item">
                                                        <input type="radio" id="ritema" name="radio1" tabIndex="0"  checked={this.state.radio1}  onChange={this.handleradioChange} onClick={this.handleRadioClick}/>
                                                        <label for="ritema">Yes</label>
                                                    </div>

                                                    <div class="radio-item">
                                                        <input type="radio" id="ritemb" name="radio2" value="ropt2" tabIndex="0" checked={this.state.radio2}  onChange={this.handleradioChange} onClick={this.handleRadioClick} />
                                                        <label for="ritemb">No</label>
                                                    </div>

                                                </FormGroup>
                                                <FormGroup >
                                                    <TextInput
                                                        id="test2"
                                                        invalidText="Invalid error message."
                                                        labelText="Your reference Ticket ID"
                                                        placeholder="(Optional)"
                                                        name="ticketID"
                                                        onChange={this.handleChange}
                                                        value={this.state.ticketID}
                                                    />
                                                </FormGroup>
                                               <FormGroup>
                                                <FileUpload accept={[".xlsx", ".xls"]} multiple labelText="Drag and drop files here or click to upload" labelvalue="only 500kb allowed"/>
                                                </FormGroup>
                                            </div>
                                            <Button className="cancel-btn" kind="ghost" onClick={this.handleclickk}>
                                                Cancel
                                            </Button>
                                            <Button className="next-btn" kind="primary" onClick={this.handleClickNext} disabled={!enabled}>
                                                Next
                                            </Button>
                                        </Form>
                                    </div>)}

                                    {this.state.value === 1 && (<div className="tab">

                                        <Form>
                                            <div className="bx--col-md-6">
                                                <h4>Summary</h4>
                                                <p>please review summary before creating your request</p>

                                                <h4 className="details">Details</h4>

                                                <p>Reference Ticket ID:{this.state.ticketID}</p>

                                                <p>Is this issue critically impacting your production enviroment?  {info}</p>

                                                <p>{filelist.length} Attachments: {filelist.map((file) => file.name + ", ")}</p>

                                                <FormGroup >
                                                <TextArea disabled
                                                    cols={50}
                                                    id="test5"
                                                    invalidText="Invalid error message."
                                                    labelText="Request"
                                                    placeholder={this.state.request}
                                                    rows={4}
                                                    onClick={this.handleChangeSubmitBtn}
                                                    onChange={this.handleChangeSeverity}
                                                />
                                            </FormGroup>
                                            </div>
                                            <div className="btn-container">
                                                <Button className="submit-btn" kind="primary" onClick={this.handleCreateRequest}>
                                                    Create Request
                                                </Button>
                                                <Button className="submit-btn" kind="secondary" onClick={this.handleClickBack}>
                                                    Back
                                                </Button>
                                            </div>
                                        </Form>
                                    </div>)}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>)}

                {this.state.opened && (<div>
                <div className="sucess-message">
                  <p><CheckmarkOutline32 className="icon-position"/> <span>Your request was successfully sent.</span></p>
                </div>
              <div className="now-you-see">
                <h4>Now you can:</h4>
                <p><a href="#">Open portal chat </a></p>
                <p><a href="#">See reqpest details view (ID:23489723489)</a></p>
                <p><a href="#">Add anopher request</a></p>
                <p><a href="#">Browse all requests</a></p>
              </div>
              </div>
              )}
            </>
        )

    }
}
export default withRouter(NewRequest)
