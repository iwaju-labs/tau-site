import { features } from '../data/features';

interface Props {
	slug: string;
	className?: string;
}

export default function FeatureIcon({ slug, className = 'size-8 text-[#6b4f47]' }: Props) {
	const feature = features.find((f) => f.slug === slug);
	if (!feature) return null;
	const Icon = feature.icon;
	return <Icon className={className} />;
}
