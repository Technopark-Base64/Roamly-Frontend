import { ReactNode, useState } from 'react';
import { Page404 } from 'src/pages/Page404';
import { PlacesList } from 'src/widgets/PlacesList';
import { TripCard, useCurrentTrip } from 'src/entities/Trip';
import cls from './style.module.scss';

type TMenu = 'places' | 'search' | 'calendar';

interface ITab {
	menu: TMenu,
	label: string,
	element: ReactNode,
}

export const TripPage = () => {
	const [menu, setMenu] = useState<TMenu>('places');
	const { currentTrip } = useCurrentTrip();

	const tabs: ITab[] = [
		{
			menu: 'places',
			label: 'Места',
			element: <PlacesList places={currentTrip?.places ?? []} />,
		},
		{
			menu: 'calendar',
			label: 'Календарь',
			element: <div> CALENDAR </div>,
		},
	];

	if (!currentTrip)
		return <Page404 />;

	return (
		<div className={cls.page}>
			{ currentTrip && <TripCard trip={currentTrip} /> }

			<div className={cls.buttonContainer}>
				{tabs.map((tab) => (
					<button
						className={`${cls.tab} ${menu === tab.menu && cls.tabActive}`}
						onClick={() => setMenu(tab.menu)}
						key={tab.menu}
					>
						{tab.label}
					</button>
				))}
			</div>

			<div className={cls.content}>
				{ tabs.find((item) => item.menu === menu)!.element }
			</div>

		</div>
	);
};





// https://www.google.com/maps/search/?api=1&query=Google&query_place_id=ChIJv21XTFtKtUYR8ikdmhgpqJM





const events = [
	{
		'place': 'Гум',
		'start_time': '2023-10-13T10:00:00Z',
		'end_time': '2023-10-13T11:00:00Z',
		'payload': {}
	},
	{
		'place': 'Красная площадь',
		'start_time': '2023-10-13T11:30:00Z',
		'end_time': '2023-10-13T12:30:00Z',
		'payload': {}
	},
	{
		'place': 'Большой театр',
		'start_time': '2023-10-13T13:00:00Z',
		'end_time': '2023-10-13T14:00:00Z',
		'payload': {}
	},
	{
		'place': 'Центральный парк культуры и отдыха им. М.Горькогo',
		'start_time': '2023-10-13T15:00:00Z',
		'end_time': '2023-10-13T17:00:00Z',
		'payload': {}
	},
	{
		'place': 'Музей-заповедник Царицыно',
		'start_time': '2023-10-13T17:30:00Z',
		'end_time': '2023-10-13T19:00:00Z',
		'payload': {}
	},
	{
		'place': 'ГЗМ "Останкино и Кусково" (Усадьба Кусково)',
		'start_time': '2023-10-13T19:30:00Z',
		'end_time': '2023-10-13T21:00:00Z',
		'payload': {}
	},
	{
		'place': 'ВДНХ',
		'start_time': '2023-10-14T10:00:00Z',
		'end_time': '2023-10-14T12:00:00Z',
		'payload': {}
	},
];

const selectedInit = [
	{
		'business_status': 'OPERATIONAL',
		'formatted_address': 'Красная пл., Москва, Россия, 109012',
		'geometry': {
			'location': {
				'lat': 55.75393030000001,
				'lng': 37.620795
			},
			'viewport': {
				'northeast': {
					'lat': 55.75633379999999,
					'lng': 37.62498105000001
				},
				'southwest': {
					'lat': 55.75060940000001,
					'lng': 37.61658125
				}
			}
		},
		'icon': 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
		'icon_background_color': '#7B9EB0',
		'icon_mask_base_uri': 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
		'name': 'Красная Площадь',
		'opening_hours': {},
		'photos': [
			{
				'height': 2599,
				'html_attributions': [
					'<a href="https://maps.google.com/maps/contrib/107602530645226643442">Master Miyoshi</a>'
				],
				'photo_reference': 'AdCG2DPBaasImSGQHQkSy5GjxgzLMqBcnRtwJafh8NqevUPThzrKGpeMe8qI6HQkGZurmrtkP2cTyWgA4scQU-7z2aQJaMtn2BUJ185b3m7QQ7ptrzohdPGmL04CG6rTNmEX8dIavc5OfrzEp-1H3uAf90IpUydHpyW-xbZqR415S7TkT4R0',
				'width': 2600
			}
		],
		'place_id': 'ChIJGaSPc1pKtUYRHzFSa1B9NHw',
		'plus_code': {
			'compound_code': 'QJ3C+H8 Тверской р-н, Москва',
			'global_code': '9G7VQJ3C+H8'
		},
		'rating': 4.8,
		'reference': 'ChIJGaSPc1pKtUYRHzFSa1B9NHw',
		'types': [
			'tourist_attraction',
			'point_of_interest',
			'establishment'
		],
		'user_ratings_total': 167971
	},
	{
		'business_status': 'OPERATIONAL',
		'formatted_address': 'Красная пл., 3, Москва, Россия, 109012',
		'geometry': {
			'location': {
				'lat': 55.7546967,
				'lng': 37.6215216
			},
			'viewport': {
				'northeast': {
					'lat': 55.75639479999999,
					'lng': 37.62487640000001
				},
				'southwest': {
					'lat': 55.7529072,
					'lng': 37.61806920000001
				}
			}
		},
		'icon': 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png',
		'icon_background_color': '#4B96F3',
		'icon_mask_base_uri': 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet',
		'name': 'ГУМ',
		'opening_hours': {
			'open_now': true
		},
		'photos': [
			{
				'height': 3024,
				'html_attributions': [
					'<a href="https://maps.google.com/maps/contrib/103063626344140574398">A Google User</a>'
				],
				'photo_reference': 'AdCG2DM6rqMGLmcBG_qYkJe2VKzlDtFbbRQznXKxPyJ04dVvf3gGOdrCU5cXj-LwmTkKWj8GcCS9vD3n-CBi6Fp2vkhnEWMSBbQkZgo8VTpl4bB4eqGuBAux90iynvS-KtUjfkP5ANwHHzoO1HDHL-91c-XXomdkdmAv0K_EfI72Z9hn7d1x',
				'width': 4032
			}
		],
		'place_id': 'ChIJ_VJFi1lKtUYRBWr-cFsm8tI',
		'plus_code': {
			'compound_code': 'QJ3C+VJ Тверской р-н, Москва',
			'global_code': '9G7VQJ3C+VJ'
		},
		'rating': 4.6,
		'reference': 'ChIJ_VJFi1lKtUYRBWr-cFsm8tI',
		'types': [
			'shopping_mall',
			'point_of_interest',
			'establishment'
		],
		'user_ratings_total': 47176
	},
	{
		'business_status': 'OPERATIONAL',
		'formatted_address': 'Дольская ул., 1, Москва, Россия, 115569',
		'geometry': {
			'location': {
				'lat': 55.6116874,
				'lng': 37.6861486
			},
			'viewport': {
				'northeast': {
					'lat': 55.61925175,
					'lng': 37.70882719999999
				},
				'southwest': {
					'lat': 55.60651795,
					'lng': 37.6629924
				}
			}
		},
		'icon': 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/museum-71.png',
		'icon_background_color': '#13B5C7',
		'icon_mask_base_uri': 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/museum_pinlet',
		'name': 'Музей-заповедник Царицыно',
		'opening_hours': {
			'open_now': true
		},
		'photos': [
			{
				'height': 3024,
				'html_attributions': [
					'<a href="https://maps.google.com/maps/contrib/102175952924911340402">A Google User</a>'
				],
				'photo_reference': 'AdCG2DPoJCeUE5IBjigloZQDRZmLGl211AvByCuQ3QGTXLsR-qA1DBrABfb8EAyYXIpMeG7ixU8BNTIkV32dU98jlKmuyuL5wJ7GP4zQBxVZ_RTwLpzTvshDiXSWHSO3tGXZZP5IqB1A54Mkb9myHTVCzvWbLS8aWcXUH654_pPkolSB_4vr',
				'width': 4032
			}
		],
		'place_id': 'ChIJlR__ZcyzSkERkf16mp9JYWI',
		'plus_code': {
			'compound_code': 'JM6P+MF р-н Орехово-Борисово Северное, Москва',
			'global_code': '9G7VJM6P+MF'
		},
		'rating': 4.8,
		'reference': 'ChIJlR__ZcyzSkERkf16mp9JYWI',
		'types': [
			'tourist_attraction',
			'museum',
			'park',
			'point_of_interest',
			'establishment'
		],
		'user_ratings_total': 59101
	},
	{
		'business_status': 'OPERATIONAL',
		'formatted_address': 'Театральная пл., 1, Москва, Россия, 125009',
		'geometry': {
			'location': {
				'lat': 55.76013349999999,
				'lng': 37.6186486
			},
			'viewport': {
				'northeast': {
					'lat': 55.76131347989273,
					'lng': 37.62044267989272
				},
				'southwest': {
					'lat': 55.75861382010728,
					'lng': 37.61774302010728
				}
			}
		},
		'icon': 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
		'icon_background_color': '#13B5C7',
		'icon_mask_base_uri': 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
		'name': 'Большой театр',
		'photos': [
			{
				'height': 768,
				'html_attributions': [
					'<a href="https://maps.google.com/maps/contrib/116119952247497946648">Kirill Groshev</a>'
				],
				'photo_reference': 'AdCG2DP1ZvssitOyF8NeZaaq5F5nWzDwPmiTSTrPaX0r7fFK87mEHRUnL8N1R6As6gWy_EFc9ZQlE3vJu9D-4CgrV8AkoX3_wnqdT4pcEz4y1xaYaTzrgEWT8KxZzx5Ay3FOzA0_DaYxRMwLZ3gqY16qSx30_p_l-dJNTQoLotR76BokL8sS',
				'width': 1024
			}
		],
		'place_id': 'ChIJv21XTFtKtUYR8ikdmhgpqJM',
		'plus_code': {
			'compound_code': 'QJ69+3F Тверской р-н, Москва',
			'global_code': '9G7VQJ69+3F'
		},
		'rating': 4.8,
		'reference': 'ChIJv21XTFtKtUYR8ikdmhgpqJM',
		'types': [
			'tourist_attraction',
			'museum',
			'point_of_interest',
			'establishment'
		],
		'user_ratings_total': 22679
	},
	{
		'business_status': 'OPERATIONAL',
		'formatted_address': 'ул. Крымский Вал, 9, Москва, Россия, 119049',
		'geometry': {
			'location': {
				'lat': 55.72836479999999,
				'lng': 37.6012908
			},
			'viewport': {
				'northeast': {
					'lat': 55.7393685,
					'lng': 37.61294714999998
				},
				'southwest': {
					'lat': 55.71508689999998,
					'lng': 37.58804895
				}
			}
		},
		'icon': 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/park-71.png',
		'icon_background_color': '#4DB546',
		'icon_mask_base_uri': 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/tree_pinlet',
		'name': 'Центральный парк культуры и отдыха им. М.Горькогo',
		'opening_hours': {
			'open_now': true
		},
		'photos': [
			{
				'height': 3024,
				'html_attributions': [
					'<a href="https://maps.google.com/maps/contrib/104987816460994168395">A Google User</a>'
				],
				'photo_reference': 'AdCG2DNlH-9t9DZxDVdNmfRtNYqSR06c7S7dcuX0JS4_objneKKwfbdz1Op-TohaXKZCjLk-SYZErNzIG-zIPz4awAZfQdW33nYE24SNRvpAKH-_snCx9XvFvUJnUCCcI7GeeiKZT8x2tKNvhe_gMlfWiwHFIOLXBTF2vsxMuE8HdtMQ1vgO',
				'width': 4032
			}
		],
		'place_id': 'ChIJw8v9-AhLtUYR8B9wzYvNdUM',
		'plus_code': {
			'compound_code': 'PJH2+8G р-н Якиманка, Москва',
			'global_code': '9G7VPJH2+8G'
		},
		'rating': 4.7,
		'reference': 'ChIJw8v9-AhLtUYR8B9wzYvNdUM',
		'types': [
			'park',
			'tourist_attraction',
			'point_of_interest',
			'establishment'
		],
		'user_ratings_total': 84672
	},
	{
		'business_status': 'OPERATIONAL',
		'formatted_address': 'ул. Юности, 2, Москва, Россия, 111402',
		'geometry': {
			'location': {
				'lat': 55.7352719,
				'lng': 37.8075939
			},
			'viewport': {
				'northeast': {
					'lat': 55.73662172989272,
					'lng': 37.80894372989273
				},
				'southwest': {
					'lat': 55.73392207010728,
					'lng': 37.80624407010728
				}
			}
		},
		'icon': 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
		'icon_background_color': '#7B9EB0',
		'icon_mask_base_uri': 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
		'name': 'ГЗМ "Останкино и Кусково" (Усадьба Кусково)',
		'opening_hours': {
			'open_now': true
		},
		'photos': [
			{
				'height': 4000,
				'html_attributions': [
					'<a href="https://maps.google.com/maps/contrib/109802967462882687221">A Google User</a>'
				],
				'photo_reference': 'AdCG2DMNIThavmGod9jFiUJoGko6mF4eGI64L8LXOL-ug7tFPLTOJGBvLjvRE-0rHYIfQmSWuS02DmBe3hfw9lIdL_PYIpZS0OhTAPjHXiqV5ETHCXPTg8dGW54eixyMbJQhBaAOJQHSyvGfF4JDtx2AyV9Osy908uuec1u6zrPsMXUwGPjN',
				'width': 6000
			}
		],
		'place_id': 'ChIJUUSudIfKSkER0_wkTHP6mvY',
		'plus_code': {
			'compound_code': 'PRP5+42 р-н Вешняки, Москва',
			'global_code': '9G7VPRP5+42'
		},
		'rating': 4.7,
		'reference': 'ChIJUUSudIfKSkER0_wkTHP6mvY',
		'types': [
			'tourist_attraction',
			'park',
			'museum',
			'point_of_interest',
			'establishment'
		],
		'user_ratings_total': 13552
	}
];