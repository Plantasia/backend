import { Category } from '@entities/category.entity'
import { Topic } from '@entities/topic.entity'
import { User } from '@entities/user.entity'
import { internet, random } from "faker"
import { getRepository } from 'typeorm'

export default async function TopicsSeed(verifyRun:boolean){
  let resp:boolean=true
  verifyRun? resp=true: resp=false
  
  if(!resp)return resp



  const topicRepository = await getRepository(Topic)
  const userRepository = await getRepository(User)
  const categoryRepository = await getRepository(Category)
  var seedingId =1

  var t1 = new Topic()
  t1.category = await categoryRepository.findOne({where:{name:"Cactáceas"}})
  t1.imageStorage =internet.avatar()
  t1.name = "Cactáceas, quanta água usar?"
  t1.user = await userRepository.findOne({where:{seedingId}})
  t1.textBody = random.words()
  seedingId++
  var topic1 =await  topicRepository.create(t1)
      
  var t2 = new Topic()
  t2.category = await categoryRepository.findOne({where:{name:"Gramíneas"}})
  t2.imageStorage =internet.avatar()
  t2.name = "Grama, como evitar o amarelamento?"
  t2.user= await userRepository.findOne({where:{seedingId}})
  t2.textBody = random.words()
  seedingId++
  var topic2 =await  topicRepository.create(t2)
      
  var t3 = new Topic()
  t3.category= await categoryRepository.findOne({where:{name:"Gramíneas"}})
  t3.imageStorage =internet.avatar()
  t3.name = "Tirando melhor proveito da cultura de gramínea"
  t3.user= await userRepository.findOne({where:{seedingId}})
  t3.textBody = random.words()
  seedingId++
  var topic3 =await  topicRepository.create(t3)
      
  var t4 = new Topic()
  t4.category = await categoryRepository.findOne({where:{name:"Carnívoras"}})
  t4.imageStorage =internet.avatar()
  t4.name = "Plantas Carnívoras, dá pra ter uma muda?"
  t4.user = await userRepository.findOne({where:{seedingId}}) 
  t4.textBody = random.words()
  seedingId++
  var topic4 =await  topicRepository.create(t4)
      
  var t5 = new Topic()
  t5.category =await categoryRepository.findOne({where:{name:"Ornamentais"}})
  t5.imageStorage =internet.avatar()
  t5.name = "Como cuidar das plantas ornamentais?"
  t5.user =  await userRepository.findOne({where:{seedingId}}) 
  t5.textBody = random.words()
  seedingId++
  var topic5 =await  topicRepository.create(t5)
      
  var t6 = new Topic()
  t6.category =await categoryRepository.findOne({where:{name:"Suculentas"}}) 
  t6.imageStorage =internet.avatar()
  t6.name = "O que são plantas suculentas?"
  t6.user =  await userRepository.findOne({where:{seedingId}}) 
  t6.textBody = random.words()
  seedingId++
  var topic6 =await  topicRepository.create(t6)
      
  var t7 = new Topic()
  t7.category = await categoryRepository.findOne({where:{name:"Flores"}})  
  t7.imageStorage =internet.avatar()
  t7.name = "Como fortalecer suas rosas vermelhas"
  t7.user =  await userRepository.findOne({where:{seedingId}}) 
  t7.textBody = random.words()
  seedingId++
  var topic7 =await  topicRepository.create(t7)
      

  var t8 = new Topic()
  t8.category = await  categoryRepository.findOne({where:{name:"Exóticas"}})
  t8.imageStorage =internet.avatar()
  t8.name = "Begônia, como cuidar"
  t8.user =  await userRepository.findOne({where:{seedingId}})
  t8.textBody = random.words()
  seedingId++
  var topic8 =await  topicRepository.create(t8)
      

  var t9 = new Topic()
  t9.category = await  categoryRepository.findOne({where:{name:"Angiospermas"}})
  t9.imageStorage =internet.avatar()
  t9.name = "Será que você tem angiospermas em casa?"
  t9.user =  await userRepository.findOne({where:{seedingId}})
  t9.textBody = random.words()
  seedingId++
  var topic9 =await  topicRepository.create(t9)
      

  var t10 = new Topic()
  t10.category = await  categoryRepository.findOne({where:{name:"Gramíneas"}})
  t10.imageStorage =internet.avatar()
  t10.name = "Tirando melhor proveito da cultura de gramínea"
  t10.user =  await userRepository.findOne({where:{seedingId}})
  t10.textBody = random.words()
  seedingId++
  var topic10 =await  topicRepository.create(t10)
  

  var t11 = new Topic()
  t11.category = await  categoryRepository.findOne({where:{name:"Briófitas"}})
  t11.imageStorage =internet.avatar()
  t11.name = "Utilidade das antóceras"
  t11.user =  await userRepository.findOne({where:{seedingId}})
  t11.textBody = random.words()
  seedingId++
  var topic11 =await  topicRepository.create(t11)
  

  var t12 = new Topic()
  t12.category = await  categoryRepository.findOne({where:{name:"Flores"}})
  t12.imageStorage =internet.avatar()
  t12.name = "A Malva e o que você não sabia"
  t12.user =  await userRepository.findOne({where:{seedingId}})
  t12.textBody = random.words()
  seedingId++
  var topic12 =await  topicRepository.create(t12)
  

  var t13 = new Topic()
  t13.category = await  categoryRepository.findOne({where:{name:"Exóticas"}})
  t13.imageStorage =internet.avatar()
  t13.name = "Como ter seu próprio pé de Pitaya"
  t13.user =  await userRepository.findOne({where:{seedingId}})
  t13.textBody = random.words()
  seedingId++
  var topic13 =await  topicRepository.create(t13)
  

  var t14 = new Topic()
  t14.category = await  categoryRepository.findOne({where:{name:"Gramíneas"}})
  t14.imageStorage =internet.avatar()
  t14.name = "Deixe seu tapete de grama beeeem verdinho"
  t14.user =  await userRepository.findOne({where:{seedingId}})
  t14.textBody = random.words()
  seedingId++
  var topic14 =await  topicRepository.create(t14)
  

  var t15 = new Topic()
  t15.category = await  categoryRepository.findOne({where:{name:"Cactáceas"}})
  t15.imageStorage =internet.avatar()
  t15.name = "Os cactos mais caros que existem"
  t15.user =  await userRepository.findOne({where:{seedingId}})
  t15.textBody = random.words()
  seedingId++
  var topic15 =await  topicRepository.create(t15)
  

  var t16 = new Topic()
  t16.category = await  categoryRepository.findOne({where:{name:"Algas"}})
  t16.imageStorage =internet.avatar()
  t16.name = "Lugares mais baratos de São Paulo para comprar algas"
  t16.user =  await userRepository.findOne({where:{seedingId}})
  t16.textBody = random.words()
  seedingId++
  var topic16 =await  topicRepository.create(t16)
  

  var t17 = new Topic()
  t17.category = await  categoryRepository.findOne({where:{name:"Algas"}})
  t17.imageStorage =internet.avatar()
  t17.name = "Benefícios do Kombu"
  t17.user =  await userRepository.findOne({where:{seedingId}})
  t17.textBody = random.words()
  seedingId++
  var topic17 =await  topicRepository.create(t17)
  

  var t18 = new Topic()
  t18.category = await  categoryRepository.findOne({where:{name:"Algas"}})
  t18.imageStorage =internet.avatar()
  t18.name = "Espirulina tem contra-indicações?"
  t18.user =  await userRepository.findOne({where:{seedingId}})
  t18.textBody = random.words()
  seedingId++
  var topic18 =await  topicRepository.create(t18)
  

  var t19 = new Topic()
  t19.category = await  categoryRepository.findOne({where:{name:"Exóticas"}})
  t19.imageStorage =internet.avatar()
  t19.name = "Maçã Julieta nos vasos requer cuidados especiais?"
  t19.user =  await userRepository.findOne({where:{seedingId}})
  t19.textBody = random.words()
  seedingId++
  var topic19 =await  topicRepository.create(t19)
  

  var t20 = new Topic()
  t20.category = await  categoryRepository.findOne({where:{name:"Cactáceas"}})
  t20.imageStorage =internet.avatar()
  t20.name = "Todo solo de cacto é seco?"
  t20.user =  await userRepository.findOne({where:{seedingId}})
  t20.textBody = random.words()
  seedingId++
  var topic20 =await  topicRepository.create(t20)
  
const topics = [
 topic1,topic2,topic3,topic4,topic5,
 topic6,topic7,topic8,topic9,topic10,
 topic11,topic12,topic13,topic14,topic15,topic16,
 topic17,topic18,topic19,topic20
] 
   const insertedTopics = await topicRepository.save(topics)

  let exitStatus=false
  insertedTopics ? exitStatus=true : exitStatus=false
  return exitStatus
}