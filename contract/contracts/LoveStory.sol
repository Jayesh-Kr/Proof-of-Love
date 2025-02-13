// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract LoveStory {

    event PostCreated(address indexed user, uint indexed postId);
    event PostLiked(address indexed liker, uint indexed postId);

    struct LoveStoryPost {
        uint id;
        address author;
        string hashofPost;
        uint likes;
        uint timestamp;
    }
    mapping(address => mapping(uint => bool)) public hasLiked;
    LoveStoryPost[] public story;

    function createPost(string memory _hashofPost, address user) public {
        story.push(LoveStoryPost({
            id : story.length,
            author : user,
            hashofPost : _hashofPost,
            likes : 0,
            timestamp : block.timestamp
        }));
        emit PostCreated(msg.sender,story.length-1);
    }

    function likePost(uint _id) public {
        require(_id >= 0 && _id < story.length, "Post not exist");
        require(!hasLiked[msg.sender][_id], "You have already liked");
        story[_id].likes += 1;
        hasLiked[msg.sender][_id] = true;
        emit PostLiked(msg.sender , _id);
    }
    
    function getUserPost(address user) public view returns(LoveStoryPost[] memory) {
        require(address(0) != user, "Invalid Address");
        uint count = 0;
        for(uint i=0; i<story.length; i++) {
            if(story[i].author == user)
                count++;
        }
        LoveStoryPost[] memory userPost = new LoveStoryPost[](count);
        uint j = 0;
        for(uint i=0; i<story.length; i++) {
            if(story[i].author == user) {
                userPost[j] = story[i];
                j++;
            }
        }
        return userPost;
    }

    function getAllPost() public view returns(LoveStoryPost[] memory) {
        return story;
    }
    function getTotalPostCount() public view returns(uint) {
        return story.length;
    }
}