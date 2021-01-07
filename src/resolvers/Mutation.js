const uuidv4 = require('uuid').v4;

const Mutation = {
    createUser(parent, args, { db }, info) {
        const emailTaken = db.users.some((user) => user.email === args.data.email)
        if (emailTaken) {
            throw new Error('Email taken')
        }
        const user = {
            id: uuidv4(),
            ...args.data
        }
        db.users.push(user)
        return user
    },
    deleteUser(parent, args, { db }, info) {
        const userToDelete = db.users.find(user => user.id === args.id);
        if (!userToDelete) throw new Error("This User Can't Be Found");
        users = db.users.filter(user => user.id !== args.id);
        posts = db.posts.filter(post => post.author !== args.id);
        comments = db.comments.filter(comment => comment.author !== args.id);
        return userToDelete;
    },
    updateUser(parent, args, { db }, info) {
        const userToUpdate = db.users.find(user => user.id === args.id);
        if (typeof args.data.email === "string") {
            const emailTaken = db.users.some((user) => user.email === args.data.email);
            if (emailTaken) throw new Error("This Email is Already Taken");
            userToUpdate.email = args.data.email;
        };
        if (typeof args.data.name === "string") {
            userToUpdate.name = args.data.name;
        };
        if (typeof args.data.age !== "undefined") userToUpdate.age = args.data.age;
        return userToUpdate;
    },
    createPost(parent, args, { db }, info) {
        const userExists = db.users.some((user) => user.id === args.data.author)
        if (!userExists) {
            throw new Error('User not found')
        }
        const post = {
            id: uuidv4(),
            ...args.data
        }
        db.posts.push(post)
        return post
    },
    deletePost(parent, args, { db }, info) {
        const postToDelete = db.posts.find(post => post.id === args.id);
        if (!postToDelete) throw new Error("Can't Find This Post");
        posts = db.posts.filter(post => post.id !== args.id);
        comments = db.comments.filter(comment => comment.post !== args.id);
        return postToDelete;
    },
    updatePost(parent, args, { db }, info) {
        const postToUpdate = db.posts.find(post => post.id === args.id);
        if (!postToUpdate) throw new Error("Can't Find This Post");
        if (typeof args.data.title === "string") postToUpdate.title = args.data.title;
        if (typeof args.data.body === "string") postToUpdate.body = args.data.body;
        if (typeof args.data.published === "boolean") postToUpdate.published = args.data.published;
        return postToUpdate;
    },
    createComment(parent, args, { db }, info) {
        const userExists = db.users.some((user) => user.id === args.data.author)
        const postExists = db.posts.some((post) => post.id === args.data.post && post.published)
        if (!userExists || !postExists) {
            throw new Error('Unable to find user and post')
        }
        const comment = {
            id: uuidv4(),
            ...args.data
        }
        db.comments.push(comment)
        return comment
    },
    updateComment(parent, args, { db }, info) {
        const commentToUpdate = db.comments.find(comment => comment.id === args.id);
        if (!commentToUpdate) throw new Error("Can't Find The comment");
        if (typeof args.data.text === "string") commentToUpdate.text = args.data.text;
        return commentToUpdate;
    },
    deleteComment(parent, args, { db }, info) {
        const commentToDelete = db.comments.find(comment => comment.id === args.id);
        if (!commentToDelete) throw new Error("Can't Find This Comment");
        comments = db.comments.filter(comment => comment.id !== args.id);
        return commentToDelete;
    }
};

module.exports = Mutation;
