const { Wechaty } = require('wechaty')
const qrcodeTerminal = require('qrcode-terminal');
const schedule = require('node-schedule');
const id = '@7fac53eb489a0d24ce0ed5d01ab746de541210bdf28d6a26c9e72bcd4d212dc6';
const name = 'token';

async function main () {
  const bot = new Wechaty({
    name
  })
  bot
    .on('scan', (qrcode, status) => {
      qrcodeTerminal.generate(qrcode, {
        small: true
      })
    })
    .on('login', user => {
      console.log(`User ${user} logged in`)
    })
    .on('ready', async () => {
      const contact = await bot.Contact.find({id});
      initEvent(contact);
    })
    .on('heartbeat', heartbeat => {
      console.log(`heartbeat event:`, heartbeat)
    })
    .on('friendship', args => {
      console.log(`friendship event:`, args)
    })
    .on('room-join', args => {
      console.log(`room-join event:`, args)
    })
    .on('room-topic', args => {
      console.log(`room-topic event:`, args)
    })
    .on('room-leave', args => {
      console.log(`room-leave event:`, args)
    })
    .on('room-invite', args => {
      console.log(`room-invite event:`, args)
    })
    .on('error', args => {
      console.log(`error event:`, args)
    })
    .on('message', async msg => {
      if (msg.self()) {
        return;
      }
    })
    .on('logout', user => {
      console.log(`User ${user} logout`)
    })
  await bot.start()
}

function initEvent(contact) {
  goodMorning(contact);
}

function goodMorning(contact) {
  const pass = 174;
  const leave = 106;
  const startDate = new Date('2021-11-08');
  // 每天 6 点
  // 0 0 6 * * ?
  // const job = schedule.scheduleJob('0 0 6 * * ?', async () => {
  const job = schedule.scheduleJob('5/5 * * * * ?', async () => {
    const nowData = new Date();
    const passDay = Math.floor((nowData - startDate) / 1000 / 60 / 60 / 24);
    const week = Math.floor((pass + passDay) / 7);
    const day = (pass + passDay) % 7;
    const leaveDay = leave - passDay;
    const str = `早上好：今天是怀孕的第${week}周+${day}天，baby 还有 ${leaveDay} 天出生`;
    if (leaveDay <= 0) {
      job.cancel();
    }
    await contact.say(str)
  });
}

main()
  .catch(console.error)