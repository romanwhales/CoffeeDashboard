import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { AppStore, UserInfo } from 'models';
import { withRouter, RouteComponentProps } from 'react-router';
import './TagsInput.css';

export interface TagsInputProps extends RouteComponentProps {
  tags: any[];
  placeholder: string;
  isDisabled: boolean;
  userInfo: UserInfo;
  selectedTags: (tags) => void;
}


const TagsInput: React.FunctionComponent<TagsInputProps> = props => {
  const [tags, setTags] = useState(props.tags);

  useEffect(() => {
    setTags(props.tags);
  }, [props.tags])

  const removeTags = indexToRemove => {
    let auxTags = props.tags.filter((_, index) => index !== indexToRemove);
    setTags(auxTags);
    props.selectedTags(auxTags);
  };

  const addTags = event => {
      if (event.target.value !== "") {
        let newTag = event.target.value.toUpperCase();
        setTags([...tags, newTag]);
        props.selectedTags([...tags, newTag]);
        event.target.value = "";
      }
  };

  return (
    <div className="tags-input" style={{ opacity: props.userInfo.permissions[0] > 0 ? 0.5 : 1 }}>
      <ul id="tags">
        {tags && tags.map((tag, index) => (
          <li key={index} className="tag">
            <div>{tag}</div>
            {!props.isDisabled &&
              <div className='tag-close-icon' onClick={() => removeTags(index)}>x</div>
            }
          </li>
        ))}
      </ul>
      <input
        type="text"
        onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
        placeholder={props.isDisabled ? '' : props.placeholder}
        disabled={props.isDisabled}
      />
    </div>
  );
};

const mapStateToProps = (state: AppStore) => ({
  userInfo: state.auth.userInfo,
})
const mapDispatchToProps = dispatch => ({
  
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TagsInput) as React.ComponentType<any>);