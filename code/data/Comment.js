const mongoCollections = require('./mongoCollections');
const comment = mongoCollections.comment;
const ObjectID = require('mongodb').ObjectID;
async function addComment(bodypart) {
    const Name = bodypart.Name;
    const Comment = bodypart.Comment;
    if (!Name) throw "The name of comment cannot be null in interitor";
    if (typeof Name !== "string") throw "The name must be a string in interitor";
    if (!Comment) throw "The comment is null";
    if (typeof Comment !== "string") throw "The comment must be a string type";
    var newComment = {
        Name: Name,
        Comment: Comment
    };
    const commentCollection = await comment();
    const commentInfo = commentCollection.insertOne(newComment);
    const newId = commentInfo.insertedId;
    const createComment = await getCommentById(newId);
    return createComment;
}
async function getCommentById(id) {
    if (!id) throw 'You must provide an id to search the interior';
    if (typeof id == "string") {
        const DB_id = ObjectID.createFromHexString(id);
        id = DB_id;
    }
    const commentCollection = await comment();
    const commentInfo = await commentCollection.findOne({ _id: id });
    if (!commentInfo) throw "interior cannot find."
    return commentInfo;
}
async function getAllCommentById(VIN) {
    if (!VIN) throw 'You must provide an VIN to search the interior';
    const commentCollection = await comment();
    const commentInfo = commentCollection.find({ VIN: VIN }).toArray();
    //if(!commentInfo) return "Cannot find interior for the car.";
    return commentInfo;
}
async function removeCommentById(id) {
    if (!id) throw 'You must provide an id to search the interior';
    if (typeof id == "string") {
        const DB_id = ObjectID.createFromHexString(id);
        id = DB_id;
    }
    const commentCollection = await comment();
    const deletInfo = await commentCollection.removeOne({ _id: id });
    if (deletInfo.deletedCount === 0) {
        throw "Could not delete the grade with id";
    }
    return true;
}
async function removeAllCommentById(VIN) {
    if (!VIN) throw 'You must provide an VIN to search the interior';
    const commentCollection = await comment();
    const deletInfo = await commentCollection.remove({ VIN: VIN });
    if (deletInfo.deletedCount === 0) {
        throw "Could not delete the interior list with provide VIN";
    }
    return true;
}
async function updateComment(id, bodypart) {
    if (!id) throw 'You must provide an id to search the interior';
    if (typeof id == "string") {
        const DB_id = ObjectID.createFromHexString(id);
        id = DB_id;
    }
    const Name = bodypart.Name;
    const Comment = bodypart.Comment;
    if (!Name) throw "The name of comment cannot be null in interitor";
    if (typeof Name !== "string") throw "The name must be a string in interitor";
    if (!Comment) throw "The comment is null";
    if (typeof Comment !== "string") throw "The comment must be a string type";
    var updatecomment = {
        Name: Name,
        Comment: Comment
    };
    const commentCollection = await comment();
    const commentchange = commentCollection.updateOne({ _id: id }, { $set: updatecomment });
    if (commentchange.modifiedCount === 0) return "Cannot update comment by provide id";
    return commentchange;
}
module.exports = {
    addComment,
    getCommentById,
    getAllCommentById,
    removeCommentById,
    removeAllCommentById,
    updateComment
};