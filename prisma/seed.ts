import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const dbPath = process.env.DATABASE_URL?.replace('file:', '') || 'dev.db';
const adapter = new PrismaBetterSqlite3({ url: dbPath });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Start seeding...');

  const leads = [
    {
      name: 'Ana Martins',
      company: 'Martins & Co.',
      email: 'ana.martins@fictitious.com',
      phone: '+55 11 99999-0001',
      source: 'WhatsApp',
      status: 'Novo Lead',
      estimatedValue: 1500,
      notes: 'Interested in digital marketing consulting.',
      utmSource: 'whatsapp',
      utmMedium: 'direct',
    },
    {
      name: 'Bruno Costa',
      company: 'Costa Tech Solutions',
      email: 'bruno@costatech.io',
      phone: '+55 21 98888-0002',
      source: 'Google Ads',
      status: 'Em Conversa',
      estimatedValue: 5000,
      notes: 'Needs a new CRM integration.',
      utmSource: 'google',
      utmMedium: 'cpc',
      utmCampaign: 'search_leads_2024',
    },
    {
      name: 'Carla Ribeiro',
      company: 'Ribeiro Advocacy',
      email: 'carla.ribeiro@lawfirm.com.br',
      phone: '+55 31 97777-0003',
      source: 'Meta Ads',
      status: 'Proposta Enviada',
      estimatedValue: 3500,
      notes: 'Legal services automation lead.',
      utmSource: 'facebook',
      utmMedium: 'social_ads',
    },
    {
      name: 'Daniel Alves',
      company: 'Alves Logística',
      email: 'daniel@alveslog.com',
      phone: '+55 41 96666-0004',
      source: 'Indicação',
      status: 'Negociação',
      estimatedValue: 12000,
      notes: 'Big fleet management project.',
    },
    {
      name: 'Fernanda Lima',
      company: 'Lima Design Studio',
      email: 'fernanda@limadesign.com',
      phone: '+55 51 95555-0005',
      source: 'Site',
      status: 'Fechado',
      estimatedValue: 2000,
      notes: 'Branding project for a small business.',
      utmSource: 'organic',
      utmMedium: 'google_search',
    },
  ];

  for (const leadData of leads) {
    const lead = await prisma.lead.create({
      data: leadData,
    });

    // Add a task for each lead
    await prisma.task.create({
      data: {
        leadId: lead.id,
        title: `Follow up with ${lead.name}`,
        type: 'call',
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      },
    });

    // Add an interaction for each lead
    await prisma.interaction.create({
      data: {
        leadId: lead.id,
        type: 'observation',
        description: 'Lead created via seed data.',
      },
    });
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
