// db.ts
import mongoose from 'mongoose';

export const connectMongo = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/myAppDb', {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });

        delete mongoose.models.User;
        // 새 스키마 생성 (timestamps 포함)
        const User = mongoose.model('User', new mongoose.Schema({
            name: String,
            age: Number,
        }, { timestamps: true }));        
        //User.schema = updatedSchema;

        await User.updateMany({}, { $set: { age: 29 } });

        console.log('✅ GOOD');
    } catch (err) {
        console.error('❌ FAIL:', err);
    }
};
