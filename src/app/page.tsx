// import WelcomeScreen from '@/screens/welcome';

import { supabaseServer } from '@/utils/supabase/server';

// export default function Home() {
// 	return <WelcomeScreen />;
// }

export default async function Notes() {
	const supabase = await supabaseServer();
	const { data: notes } = await supabase.from('notes').select();

	console.log('notes === ', notes);

	return <pre>{JSON.stringify(notes, null, 2)}</pre>;
}
