import { Component } from "react";
import "./App.css";
import { Search } from "./components/search";

// every toDoItem looks like {
//   sectionTitle: String,
//   sectionContent: [
//     {
//       content: String,
//       done: Boolean,
//        id: Number,
//     }
//   ]
// }

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchRequest: "aaaaaa",
      sections: [],
      currentSection: {},
      message: "",
    };
    this.changeSearchRequest = this.changeSearchRequest.bind(this);
    this.lookForSection = this.lookForSection.bind(this);
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

  addContent(content, id) {
    this.setState({
      ...this.state,
      currentSection: {
        ...this.state.currentSection,
        sectionContent: [
          ...this.state.currentSection.sectionContent,
          {
            content,
            done: false,
            id,
          },
        ],
      },
    });
  }

  // delete smth

  deleteContent(id) {
    const updatedContents = this.state.currentSection.sectionContent.filter(
      (contentItem) => contentItem.id !== id
    );
    const updatedSections = this.state.sections.map((section) => {
      if (section.title === this.currentSection.title) {
        return {
          title: section.title,
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
        if (section.title === this.currentSection.title) {
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
      </div>
    );
  }
}

export default App;
