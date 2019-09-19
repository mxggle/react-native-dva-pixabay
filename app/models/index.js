import detail from './detail'
import home from './home'

const models = [home,detail];

export default function modelRegister(app){
    models.forEach((o) => { // 装载models对象
        app.model(o);
    });
}