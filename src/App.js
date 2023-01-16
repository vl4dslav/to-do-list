import { Component } from "react";
import "./App.css";
import { AddItem } from "./components/addItem";
import { AddSection } from "./components/addSection";
import { List } from "./components/currentList";
import { Search } from "./components/search";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchRequest: "",
      sections: [],
      currentSection: {},
      showMessage: false,
      showAddSection: false,
    };
    this.changeSearchRequest = this.changeSearchRequest.bind(this);
    this.lookForSection = this.lookForSection.bind(this);
    this.closeMessage = this.closeMessage.bind(this);
    this.addContent = this.addContent.bind(this);
    this.addSection = this.addSection.bind(this);
    this.deleteContent = this.deleteContent.bind(this);
    this.deleteSection = this.deleteSection.bind(this);
    this.toggleDone = this.toggleDone.bind(this);
  }

  lookForSection(usersTitle) {
    const usersSection = this.state.sections.filter(
      (section) => section.sectionTitle === usersTitle
    );
    if (usersSection.length === 0) {
      this.setState({
        ...this.state,
        message: `You don't have section ${usersTitle}`,
      });
    } else {
      this.setState({
        ...this.state,
        currentSection: usersSection[0],
      });
    }
  }

  closeMessage() {
    this.setState({
      ...this.state,
      message: "",
    });
  }

  addSection(sectionTitle) {
    this.setState({
      ...this.state,
      sections: [
        ...this.state.sections,
        {
          sectionTitle,
          sectionContent: [],
        },
      ],
      currentSection: {
        sectionTitle,
        sectionContent: [],
      },
    });
  }

  addContent(content) {
    const updatedContents = this.state.currentSection.sectionContent.concat([
      {
        content,
        done: false,
      },
    ]);
    const updatedSections = this.state.sections.map((section) => {
      if (section.sectionTitle === this.state.currentSection.sectionTitle) {
        return {
          sectionTitle: section.sectionTitle,
          sectionContent: updatedContents,
        };
      }
      return section;
    });
    this.setState({
      ...this.state,
      currentSection: {
        ...this.state.currentSection,
        sectionContent: updatedContents,
      },
      sections: updatedSections,
    });
  }

  deleteContent(id) {
    const updatedContents = this.state.currentSection.sectionContent.filter(
      (contentItem, index) => index !== +id
    );
    const updatedSections = this.state.sections.map((section) => {
      if (section.sectionTitle === this.state.currentSection.sectionTitle) {
        return {
          sectionTitle: section.sectionTitle,
          sectionContent: updatedContents,
        };
      }
      return section;
    });
    this.setState({
      ...this.state,
      currentSection: {
        ...this.state.currentSection,
        sectionContent: updatedContents,
      },
      sections: updatedSections,
    });
  }

  deleteSection() {
    const updatedSections = this.state.sections
      .map((section) => {
        if (section.title === this.state.currentSection.sectionTitle) {
          return null;
        }
        return section;
      })
      .filter((section) => section !== null);
    this.setState({
      ...this.state,
      currentSection: {},
      sections: updatedSections,
    });
  }

  changeSearchRequest(updatedRequest) {
    const updatedCurrentSection = this.state.sections.filter(
      (item) => item.sectionTitle === updatedRequest
    );
    if (updatedCurrentSection.length === 0) {
      this.setState({
        ...this.state,
        searchRequest: updatedRequest,
        showMessage: true,
      });
    } else {
      this.setState({
        ...this.state,
        searchRequest: updatedRequest,
        currentSection: updatedCurrentSection[0],
      });
    }
  }

  toggleDone(id) {
    const updatedContents = this.state.currentSection.sectionContent.map(
      (contentItem, index) =>
        index === +id
          ? { ...contentItem, done: !contentItem.done }
          : contentItem
    );
    const updatedSections = this.state.sections.map((section) => {
      if (section.sectionTitle === this.state.currentSection.sectionTitle) {
        return {
          sectionTitle: section.sectionTitle,
          sectionContent: updatedContents,
        };
      }
      return section;
    });
    this.setState({
      ...this.state,
      currentSection: {
        ...this.state.currentSection,
        sectionContent: updatedContents,
      },
      sections: updatedSections,
    });
  }

  render() {
    if (Object.keys(this.state.currentSection).length === 0) {
      return (
        <div className="app">
          <Search changeSearchRequest={this.changeSearchRequest} />
          <div className="d-flex justify-content-evenly">
            <button
              className="btn btn-primary"
              onClick={() => {
                this.setState({
                  ...this.state,
                  showAddSection: !this.state.showAddSection,
                });
              }}
            >
              Create new section
            </button>
          </div>
          {this.state.showAddSection ? (
            <AddSection saveSection={this.addSection} />
          ) : (
            <></>
          )}

          {this.state.showMessage ? (
            <div className="message text-bg-light">
              <div className="header d-flex flex-row-reverse text-bg-dark">
                <button
                  className="close-btn "
                  onClick={() => {
                    this.setState({
                      ...this.state,
                      showMessage: false,
                    });
                  }}
                  style={{
                    width: "30px",
                    height: "30px",
                    display: "inline-block",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      fontSize: "30px",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%,-55%)",
                    }}
                  >
                    x
                  </div>
                </button>
              </div>
              <div className="message-text text-bg-light p-3">
                {`You don't have a section named ${this.state.searchRequest}`}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      );
    }
    return (
      <div className="app">
        <Search changeSearchRequest={this.changeSearchRequest} />
        <div className="d-flex justify-content-evenly">
          <button
            className="btn btn-primary"
            onClick={() => {
              this.setState({
                ...this.state,
                showAddSection: !this.state.showAddSection,
              });
            }}
          >
            Create new section
          </button>
          <button
            className="btn btn-danger"
            onClick={() =>
              this.deleteSection(this.state.currentSection.sectionTitle)
            }
          >
            Delete current section
          </button>
        </div>
        {this.state.showAddSection ? (
          <AddSection saveSection={this.addSection} />
        ) : (
          <></>
        )}

        <AddItem
          sectionName={this.state.currentSection.sectionTitle}
          addContent={this.addContent}
        />
        <List
          items={this.state.currentSection.sectionContent}
          sectionTitle={this.state.currentSection.sectionTitle}
          delete={this.deleteContent}
          toggleDone={this.toggleDone}
        />

        {this.state.showMessage ? (
          <div className="message text-bg-light">
            <div className="header d-flex flex-row-reverse text-bg-dark">
              <button
                className="close-btn "
                onClick={() => {
                  this.setState({
                    ...this.state,
                    showMessage: false,
                  });
                }}
                style={{
                  width: "30px",
                  height: "30px",
                  display: "inline-block",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    fontSize: "30px",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-55%)",
                  }}
                >
                  x
                </div>
              </button>
            </div>
            <div className="message-text text-bg-light p-3">
              {`You don't have a section named ${this.state.searchRequest}`}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default App;
