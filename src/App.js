import { Component } from "react";
import "./App.css";
import { AddItem } from "./components/addItem";
import { List } from "./components/currentList";
import { Search } from "./components/search";

// every toDoItem looks like {
//   sectionTitle: String,
//   sectionContent: [
//     {
//       content: String,
//       done: Boolean,
//        ?id: string
//     }
//   ]
// }
// const firstSection = {
//   sectionTitle: "asf",
//   sectionContent: [{ content: "fafsdfsfsafsf", done: false, id: "0" }],
// };
class App extends Component {
  constructor(props) {
    const firstSection = {
      sectionTitle: "asf",
      sectionContent: [
        { content: "fafsdfsfsafsf", done: false },
        { content: "zxcxzxx", done: true },
      ],
    };
    const secondSection = {
      sectionTitle: "fdsf",
      sectionContent: [{ content: "fafsdfsfsafsf", done: false }],
    };
    super(props);
    this.state = {
      searchRequest: "aaaaaa",
      sections: [firstSection, secondSection],
      currentSection: firstSection,
      message: "",
    };
    this.changeSearchRequest = this.changeSearchRequest.bind(this);
    this.lookForSection = this.lookForSection.bind(this);
    this.closeMessage = this.closeMessage.bind(this);
    this.addContent = this.addContent.bind(this);
    this.addSection = this.addSection.bind(this);
    this.deleteContent = this.deleteContent.bind(this);
    this.deleteSection = this.deleteSection.bind(this);
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

  // add smth

  addSection(sectionTitle) {
    this.setState({
      ...this.state,
      sections: [
        ...this.state.sections,
        {
          sectionTitle,
        },
      ],
      currentSection: {
        sectionTitle,
      },
    });
  }

  addContent(content) {
    this.setState({
      ...this.state,
      currentSection: {
        ...this.state.currentSection,
        sectionContent: [
          ...this.state.currentSection.sectionContent,
          {
            content,
            done: false,
          },
        ],
      },
    });
  }

  // delete smth
  // good
  deleteContent(id) {
    console.log("asddsfdasfds");
    const updatedContents = this.state.currentSection.sectionContent.filter(
      (contentItem, index) => index !== +id
    );
    console.log(updatedContents);
    const updatedSections = this.state.sections.map((section) => {
      console.log(section);
      console.log(this.state.currentSection);
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
    console.log("delete content");
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
    this.setState({
      ...this.state,
      searchRequest: updatedRequest,
    });
  }

  render() {
    return (
      <div className="app">
        <Search changeSearchRequest={this.changeSearchRequest} />
        {this.state.searchRequest}
        <AddItem
          sectionName={this.state.currentSection.sectionTitle}
          addContent={this.addContent}
        />
        <List
          items={this.state.currentSection.sectionContent}
          sectionTitle={this.state.currentSection.sectionTitle}
          delete={this.deleteContent}
        />
      </div>
    );
  }
}

export default App;
