const { ObjectId } = require("mongodb");
const { customers } = require(".");

const mongoCollections = require("../config/mongoCollections");
const comments = mongoCollections.comments;
const reviews = mongoCollections.reviews;
const customers = mongoCollections.customers;

module.exports = {
	async addComment(customerId, reviewId, commentText) {
		/* if (!customerId || typeof customerId != "string")
			throw "customerId must be given as a string";
		if (!reviewId || typeof reviewId != "string")
			throw "reviewId must be given as a string";
		if (!commentText || typeof commentText != "string")
			throw "must give comment text as a string"; */
		const commentCollection = await comments();
		let newComment = {
			customerId: customerId,
			reviewId: reviewId,
			commentText: commentText,
		};
		//console.log("New Comment Added", newComment);
		const insertInfo = await commentCollection.insertOne(newComment);
		const revCollection = await reviews();
		/* const customerCollection = await users();
		let { ObjectId } = require("mongodb");
		let newObjId = ObjectId();
		if (!ObjectId.isValid(newObjId)) throw "Object id is not valid";
		let x = newObjId.toString();
		let parsedId = ObjectId(customerId);*/
		let parsedId2 = ObjectId(reviewId);

		if (insertInfo.insertedCount === 0) {
			throw "Could not add new Review";
		}
		const newId = insertInfo.insertedId;
		const finComment = await this.getComment(newId.toString());
		const updatedInfo = await revCollection.updateOne(
			{ _id: parsedId2 },
			{ $push: { comments: newComment.commentText } }
		);
		if (updatedInfo.modifiedCount === 0) {
			throw "Could not update Review Collection with Review Data!";
		}

		//const newId = insertInfo.insertedId;
		//const newIDString = String(newId);
		//const recentComment = await this.getComment(newIDString);
		return finComment;
	},

	async getComment(id) {
		if (!id) throw "id must be given";
		let parsedId = ObjectId(id);
		const commentCollection = await comments();
		const comment = await commentCollection.findOne({ _id: parsedId });
		if (!comment) throw "Comment with that id does not exist";
		return comment;
	},
	// Find all the comments of a specific customerId returns an array of comments
	async getCommentsForCustomer(customerId) {
		if (!customerId || typeof customerId !== "string")
			throw "customerId is invalid";
		//let parsedId = ObjectId(customerId);
		const commentCollection = await comments();
		const foundComment = await commentCollection
			.find({ customerId: customerId })
			.toArray();
		return foundComment;
	},
	// Find all the comments of a specific reviewId returns an array of comments
	async getCommentsForReview(reviewId) {
		if (!reviewId || typeof reviewId !== "string") throw "reviewId is invalid";
		//let parsedId = ObjectId(customerId);
		const commentCollection = await comments();
		const foundComment = await commentCollection
			.find({ reviewId: reviewId })
			.toArray();
		return foundComment;
	},
	//comments for a user
	//comments for a reviews

	async removeComment(id) {
		if (!id || typeof id != "string") throw "id must be given as a string";
		const commentCollection = await comments();
		let comment = await this.getComment(id);
		const deleteInfo = await commentCollection.removeOne({ _id: id });
		if (deleteInfo.deletedCount === 0) {
			throw "could not delete comment with id of ${id}";
		}
		try {
			const reviewCollection = await reviews();
			const { ObjectId } = require("mongodb");
			const objcustomerId = ObjectId(comment.reviewId);
			const deletionInfoForCommentFromReview = await reviewCollection.updateOne(
				{ _id: objcustomerId },
				{ $pull: { comments: String(id) } }
			);

			if (deletionInfoForCommentFromReview.deletedCount === 0) {
				throw `Could not delete Comment with id of ${id}`;
			}
		} catch (e) {
			throw "Could not Delete Comment from Review while Deleting Comment!";
		}

		return true;
	},

	async updateComment(id, commentText) {
		//Should be kept or not
		if (!id || typeof id !== "string") throw "CommentID is invalid";
		if (!commentText || typeof commentText !== "string")
			throw "The text of the comment is invalid";
		const updatedCommentData = {};
		if (!commentText) {
			throw "Please Enter a Comment";
		} else {
			updatedCommentData.commentText = commentText;
		}

		if (typeof id === "string") id = ObjectId(id);
		const commentCollection = await comments();
		const updateCommentInfo = await commentCollection.updateOne(
			{ _id: id },
			{ $set: updatedCommentData }
		);
		if (updateCommentInfo.modifiedCount === 0) throw "Could not update comment";
		return await this.getComment(id);
	},
};
