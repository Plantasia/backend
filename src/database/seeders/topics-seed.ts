import { Category } from "@entities/category.entity"
import { Topic } from "@entities/topic.entity"
import { User } from "@entities/user.entity"
import { internet, random } from "faker"

export default async function TopicsSeed(){

  var t1 = new Topic()
  t1.category = await Category.findOne("2db3726c-4356-4e9c-a05b-1581caa573fc")
  t1.imageStorage =internet.avatar()
  t1.name = "Cactáceas, quanta água usar?"
  t1.user = await User.findOne("1631146a-f555-478a-826f-7c4f27b2550f")
  t1.textBody = random.words()
  var topic1 =await  Topic.create(t1)
      
  var t2 = new Topic()
  t2.category = await Category.findOne('4dd22a4b-e845-432c-ae05-f7ab7541da3e')
  t2.imageStorage =internet.avatar()
  t2.name = "Grama, como evitar o amarelamento?"
  t2.user= await User.findOne("18074119-5403-4e81-8fda-2fb315b2fd9d")
  t2.textBody = random.words()
  var topic2 =await  Topic.create(t2)
      
  var t3 = new Topic()
  t3.category= await Category.findOne('30ae40e9-4782-4e2c-9625-717ccb402acc')
  t3.imageStorage =internet.avatar()
  t3.name = "Tirando melhor proveito da cultura de gramínea"
  t3.user= await User.findOne("18074119-5403-4e81-8fda-2fb315b2fd9d")
  t3.textBody = random.words()
  var topic3 =await  Topic.create(t3)
      
  var t4 = new Topic()
  t4.category = await Category.findOne('53867fac-ed0f-4283-838b-27d8fe649516')
  t4.imageStorage =internet.avatar()
  t4.name = "Plantas Carnívoras, dá pra ter uma muda?"
  t4.user = await User.findOne("277c7def-8af2-4e55-95c5-43485685dbfe") 
  t4.textBody = random.words()
  var topic4 =await  Topic.create(t4)
      
  var t5 = new Topic()
  t5.category =await Category.findOne('71a064b8-c883-4df7-bfda-f9d7825e972f')
  t5.imageStorage =internet.avatar()
  t5.name = "Como cuidar das plantas ornamentais?"
  t5.user =  await User.findOne("2c083c3d-6209-4686-852f-c37e53e559a6") 
  t5.textBody = random.words()
  var topic5 =await  Topic.create(t5)
      
  var t6 = new Topic()
  t6.category =await Category.findOne('a1f7f392-0841-4e06-af84-72db3980beef') 
  t6.imageStorage =internet.avatar()
  t6.name = "O que são plantas suculentas?"
  t6.user =  await User.findOne("2cb06235-b993-4288-b296-5337a5d12d75") 
  t6.textBody = random.words()
  var topic6 =await  Topic.create(t1)
      
  var t7 = new Topic()
  t7.category = await Category.findOne('b687fa42-6918-4f4e-9fc7-65b0a3941571')  
  t7.imageStorage =internet.avatar()
  t7.name = "Como fortalecer suas rosas vermelhas"
  t7.user =  await User.findOne("2d61ed5b-c973-472f-a720-6485131ab8d3") 
  t7.textBody = random.words()
  var topic7 =await  Topic.create(t7)
      

  var t8 = new Topic()
  t8.category = await  Category.findOne('bae8e764-104e-40eb-8d52-7dfbd1594103')
  t8.imageStorage =internet.avatar()
  t8.name = "Begônia, como cuidar"
  t8.user =  await User.findOne("308b69db-d7f3-4897-b748-fec6a2495463")
  t8.textBody = random.words()
  var topic8 =await  Topic.create(t8)
      

  var t9 = new Topic()
  t9.category = await  Category.findOne('f94552d2-bb04-4e65-8725-3d2e8116ea9d')
  t9.imageStorage =internet.avatar()
  t9.name = "Será que você tem angiospermas em casa?"
  t9.user =  await User.findOne("33dcf202-72a5-40e8-9dcf-0fd184bc42a4")
  t9.textBody = random.words()
  var topic9 =await  Topic.create(t9)
      

  var t10 = new Topic()
  t10.category = await  Category.findOne('30ae40e9-4782-4e2c-9625-717ccb402acc')
  t10.imageStorage =internet.avatar()
  t10.name = "Tirando melhor proveito da cultura de gramínea"
  t10.user =  await User.findOne("33fd87c3-809c-482f-9fa9-321a6902cbb2")
  t10.textBody = random.words()
  var topic10 =await  Topic.create(t10)
  

  var t11 = new Topic()
  t11.category = await  Category.findOne('fd9b0695-67d1-4265-8193-b5d63b88e67b')
  t11.imageStorage =internet.avatar()
  t11.name = "Utilidade das antóceras"
  t11.user =  await User.findOne("34dac9ad-fda8-4cf9-a016-5c2b3db721a1")
  t11.textBody = random.words()
  var topic11 =await  Topic.create(t11)
  

  var t12 = new Topic()
  t12.category = await  Category.findOne('b687fa42-6918-4f4e-9fc7-65b0a3941571')
  t12.imageStorage =internet.avatar()
  t12.name = "A Malva e o que você não sabia"
  t12.user =  await User.findOne("3b53cd76-692a-4a8d-a625-0e65f4ebf053")
  t12.textBody = random.words()
  var topic12 =await  Topic.create(t12)
  

  var t13 = new Topic()
  t13.category = await  Category.findOne('71a064b8-c883-4df7-bfda-f9d7825e972f')
  t13.imageStorage =internet.avatar()
  t13.name = "Como ter seu próprio pé de Pitaya"
  t13.user =  await User.findOne("3b53cd76-692a-4a8d-a625-0e65f4ebf053")
  t13.textBody = random.words()
  var topic13 =await  Topic.create(t13)
  

  var t14 = new Topic()
  t14.category = await  Category.findOne('4dd22a4b-e845-432c-ae05-f7ab7541da3e')
  t14.imageStorage =internet.avatar()
  t14.name = "Deixe seu tapete de grama beeem verdinho"
  t14.user =  await User.findOne("3b53cd76-692a-4a8d-a625-0e65f4ebf053")
  t14.textBody = random.words()
  var topic14 =await  Topic.create(t14)
  

  var t15 = new Topic()
  t15.category = await  Category.findOne('2db3726c-4356-4e9c-a05b-1581caa573fc')
  t15.imageStorage =internet.avatar()
  t15.name = "Os cactos mais caros que existem"
  t15.user =  await User.findOne("33fd87c3-809c-482f-9fa9-321a6902cbb2")
  t15.textBody = random.words()
  var topic15 =await  Topic.create(t15)
  

  var t16 = new Topic()
  t16.category = await  Category.findOne('fb7a1028-c0ae-4b79-9cdd-3f0556f8d558')
  t16.imageStorage =internet.avatar()
  t16.name = "Lugares mais baratos de São Paulo para comprar algas"
  t16.user =  await User.findOne("3b53cd76-692a-4a8d-a625-0e65f4ebf053")
  t16.textBody = random.words()
  var topic16 =await  Topic.create(t16)
  

  var t17 = new Topic()
  t17.category = await  Category.findOne('fb7a1028-c0ae-4b79-9cdd-3f0556f8d558')
  t17.imageStorage =internet.avatar()
  t17.name = "Benefícios do Kombu"
  t17.user =  await User.findOne("4d7b85d2-8fb3-4df8-ac6d-5b442b69676d")
  t17.textBody = random.words()
  var topic17 =await  Topic.create(t17)
  

  var t18 = new Topic()
  t18.category = await  Category.findOne('fb7a1028-c0ae-4b79-9cdd-3f0556f8d558')
  t18.imageStorage =internet.avatar()
  t18.name = "Espirulina tem contra-indicações?"
  t18.user =  await User.findOne("63a38046-d6ba-4b2f-b485-280982d5bb48")
  t18.textBody = random.words()
  var topic18 =await  Topic.create(t18)
  

  var t19 = new Topic()
  t19.category = await  Category.findOne('bae8e764-104e-40eb-8d52-7dfbd1594103')
  t19.imageStorage =internet.avatar()
  t19.name = "Maçã Julieta nos vasos requer cuidados especiais?"
  t19.user =  await User.findOne("647c4add-376e-423d-9bcb-fa2aca2f0878")
  t19.textBody = random.words()
  var topic19 =await  Topic.create(t19)
  

  var t20 = new Topic()
  t20.category = await  Category.findOne('2db3726c-4356-4e9c-a05b-1581caa573fc')
  t20.imageStorage =internet.avatar()
  t20.name = "Todo solo de cacto é seco?"
  t20.user =  await User.findOne("2d61ed5b-c973-472f-a720-6485131ab8d3")
  t20.textBody = random.words()
  var topic20 =await  Topic.create(t20)
  
/*const topics = [
 topic1,topic2,topic3,topic4,topic5,
 topic6,topic7,topic8,topic9,topic10,
 topic11,topic12,topic13,topic14,topic15,topic16,
 topic17,topic18,topic19,topic20
]*/
 return topic1
//return topics
}