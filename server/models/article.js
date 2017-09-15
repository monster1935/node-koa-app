import mongoose from 'mongoose';
import moment from 'moment'
moment.locale('zh-cn');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: String,
    content: String,
    tags: {
        type: Array
    },
    categories: {
        type: String
    },
    viewCounts: {
        type: Number,
        default: 0
    },
    publish: {
        type: Boolean,
        default: false,
    },
    createTime: {
        type: Date,
    },
    lastEditTime: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});
articleSchema.set('toJSON', { getters: true, virtuals: true });
articleSchema.set('toObject', { getters: true, virtuals: true });
articleSchema.path('createTime').get(function(v) {
  return moment(v).format('LL');
});
articleSchema.path('lastEditTime').get(function(v) {
  return moment(v).format('LL');
});

const articleModel = mongoose.model('article', articleSchema);

export default articleModel;
