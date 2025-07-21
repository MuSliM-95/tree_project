import { motion } from 'framer-motion'
import { ArrowRight, User } from 'lucide-react'
import Link from 'next/link'

import { Button, Card, CardContent } from '@/shared/components'

export default function HomePage() {
	return (
		<main className='min-h-screen overflow-x-hidden bg-[#f9f5f0] px-4 py-8 text-[#2e2e2e] md:px-20'>
			<header className='mx-auto mb-12 flex max-w-7xl items-center justify-between'>
				<h1 className='font-serif text-2xl tracking-wide text-[#6a4e3a]'>
					Генеалогия.рф
				</h1>
				<Link
					href={'/dashboard/settings'}
					aria-label='Перейти в личный кабинет'
					className='flex items-center gap-2 border-b-2 border-transparent text-[#6a4e3a] hover:border-[#6a4e3a]'
				>
					<User className='h-5 w-5' /> Личный кабинет
				</Link>
			</header>

			<section className='mx-auto flex max-w-7xl flex-col-reverse items-center gap-12 md:flex-row'>
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6 }}
					className='flex-1'
				>
					<h2 className='font-serif text-4xl leading-snug font-bold text-[#4a372a] md:text-5xl'>
						Исследуйте свои корни
					</h2>
					<p className='mt-4 max-w-xl text-lg text-[#5a4638]'>
						Архивируйте воспоминания, сохраняйте фотографии, стройте
						древо предков в ретро-стиле, как будто это часть
						музейной экспозиции.
					</p>
					<div className='mt-6 flex flex-wrap gap-4'>
						<Link
							href={'/tree'}
							className='rounded-md flex items-center bg-[#6a4e3a] px-6 text-lg text-white hover:bg-[#523a2a]'
						>
							Начать <ArrowRight className='ml-2 h-2 w-2' />
						</Link>
						<Button
							variant='outline'
							className='border-[#6a4e3a] text-[#6a4e3a] hover:bg-[#f3ebe3]'
						>
							Подробнее
						</Button>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6 }}
					className='flex-1'
				>
					<img
						src='/images/tree-vintage.png'
						alt='Генеалогическое древо в стиле ретро'
						className='rounded-lg border border-[#d8c5b4] shadow-2xl'
					/>
				</motion.div>
			</section>

			<section className='mx-auto mt-24 max-w-7xl'>
				<div className='mb-8 text-center'>
					<h3 className='text-2xl font-semibold text-[#4a372a]'>
						Схема древа
					</h3>
					<p className='mt-2 text-[#6b5445]'>
						Визуальное представление родственных связей
					</p>
				</div>
				<div className='overflow-x-auto rounded-lg border border-[#e0d4c7] bg-[#fbf8f4] p-4 shadow-md'>
					<img
						src='/images/family-tree-sample.png'
						alt='Схема родословной'
						className='mx-auto h-auto max-w-full'
					/>
				</div>
			</section>

			<section className='mx-auto mt-24 grid max-w-7xl gap-6 md:grid-cols-3'>
				<Card className='rounded-lg border border-[#e5d6c5] bg-[#fdfaf6] shadow-sm'>
					<CardContent className='p-6'>
						<h3 className='mb-2 text-lg font-bold text-[#4d3a2b]'>
							Архивные карточки
						</h3>
						<p className='text-muted-foreground'>
							Каждая запись оформлена как архивный документ —
							эстетика старых времен.
						</p>
					</CardContent>
				</Card>

				<Card className='rounded-lg border border-[#e5d6c5] bg-[#fdfaf6] shadow-sm'>
					<CardContent className='p-6'>
						<h3 className='mb-2 text-lg font-bold text-[#4d3a2b]'>
							Фотографии и метки
						</h3>
						<p className='text-muted-foreground'>
							Прикрепляйте фото, рукописи, письма — сохраняйте всё
							важное в одном месте.
						</p>
					</CardContent>
				</Card>

				<Card className='rounded-lg border border-[#e5d6c5] bg-[#fdfaf6] shadow-sm'>
					<CardContent className='p-6'>
						<h3 className='mb-2 text-lg font-bold text-[#4d3a2b]'>
							Совместное редактирование
						</h3>
						<p className='text-muted-foreground'>
							Приглашайте родственников и вместе восстанавливайте
							историю рода.
						</p>
					</CardContent>
				</Card>
			</section>

			<section className='mx-auto mt-24 grid max-w-7xl gap-6 md:grid-cols-2'>
				<Card className='rounded-lg border border-[#dbcabc] bg-[#f4eae2]'>
					<CardContent className='p-6'>
						<h3 className='mb-3 text-xl font-semibold text-[#5c4332]'>
							Рекламный блок 1
						</h3>
						<p className='text-[#6b5445]'>
							Здесь может быть ваша реклама или партнёрская
							программа.
						</p>
					</CardContent>
				</Card>

				<Card className='rounded-lg border border-[#dbcabc] bg-[#f4eae2]'>
					<CardContent className='p-6'>
						<h3 className='mb-3 text-xl font-semibold text-[#5c4332]'>
							Рекламный блок 2
						</h3>
						<p className='text-[#6b5445]'>
							Рекомендуйте ресурсы, курсы или памятные услуги.
						</p>
					</CardContent>
				</Card>
			</section>

			<footer className='mt-24 border-t border-[#e4d5c8] py-10 text-center text-sm text-[#7a6453]'>
				<p>
					&copy; {new Date().getFullYear()} Генеалогия.рф — Все права
					защищены.
				</p>
				<p className='mt-2'>
					<a href='#' className='hover:underline'>
						Политика конфиденциальности
					</a>{' '}
					&middot;{' '}
					<a href='#' className='hover:underline'>
						Условия использования
					</a>
				</p>
			</footer>
		</main>
	)
}
