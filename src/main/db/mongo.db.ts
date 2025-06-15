// db.ts
import mongoose from 'mongoose';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import type { LayoutData } from 'rc-dock';

let mongoProcess: any = null;
mongoose.set('strictQuery', false);

// 탭 위치 정보를 저장할 스키마
const TabLayoutSchema = new mongoose.Schema({
    layoutId: { type: String, required: true, unique: true },
    layout: { type: Object, required: true },
    updatedAt: { type: Date, default: Date.now }
});

const TabLayout = mongoose.model('TabLayout', TabLayoutSchema);

export const startMongoProcess = () => {
    const mongoPath = path.join(__dirname, '..', '..', 'mongodb', 'bin', 'mongod.exe');
    const dataDir = path.join(__dirname, '..', '..', 'data', 'db');

    mongoProcess = spawn(mongoPath, ['--dbpath', dataDir], {
        stdio: 'pipe',
        windowsHide: true
    });
};

export const connectMongo = async () => {
    try {
        // 연결 옵션 설정
        const options = {
            serverSelectionTimeoutMS: 15000, // 타임아웃 시간 증가
            socketTimeoutMS: 45000,
            connectTimeoutMS: 15000,
            family: 4 // IPv4 사용
        };

        await mongoose.connect('mongodb://127.0.0.1:27017/myAppDb', options);

        delete mongoose.models.User;
        // 새 스키마 생성 (timestamps 포함)
        const User = mongoose.model('User', new mongoose.Schema({
            name: String,
            age: Number,
        }, { timestamps: true }));
        
        await User.create([
            { name: 'HAN', age: 30 },
        ]);
        await User.updateMany({}, { $set: { age: 29 } });

        console.log('✅ MongoDB GOOD');
    } catch (err) {
        console.error('❌ MongoDB FAIL:', err);
        // 프로세스가 실행 중이면 종료
        if (mongoProcess) {
            mongoProcess.kill();
            mongoProcess = null;
        }
        throw err;
    }
};
