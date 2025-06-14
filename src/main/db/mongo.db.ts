// db.ts
import mongoose from 'mongoose';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

let mongoProcess: any = null;

// strictQuery 경고 해결
mongoose.set('strictQuery', false);

export const startMongoProcess = () => {
    // MongoDB 실행 파일 경로 설정
    const mongoPath = path.join(__dirname, '..', '..', 'mongodb', 'bin', 'mongod.exe');
    
    // MongoDB 데이터 디렉토리 설정
    const dataDir = path.join(__dirname, '..', '..', 'data', 'db');
    
    // 데이터 디렉토리가 없으면 생성
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }

    // MongoDB 프로세스 시작
    mongoProcess = spawn(mongoPath, ['--dbpath', dataDir], {
        stdio: 'pipe',
        windowsHide: true
    });

    mongoProcess.stdout.on('data', (data: Buffer) => {
        console.log(`MongoDB stdout: ${data.toString('utf8')}`);
    });

    mongoProcess.stderr.on('data', (data: Buffer) => {
        console.error(`MongoDB stderr: ${data.toString('utf8')}`);
    });

    mongoProcess.on('close', (code: number) => {
        console.log(`MongoDB process exited with code ${code}`);
    });

    // MongoDB가 시작될 때까지 잠시 대기
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mongoProcess);
        }, 3000); // 대기 시간 증가
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

        await User.updateMany({}, { $set: { age: 29 } });

        console.log('✅ MongoDB 연결 성공');
    } catch (err) {
        console.error('❌ MongoDB 연결 실패:', err);
        // 프로세스가 실행 중이면 종료
        if (mongoProcess) {
            mongoProcess.kill();
            mongoProcess = null;
        }
        throw err;
    }
};
