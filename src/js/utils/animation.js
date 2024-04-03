function fallDown(timestamp, $el, startTime) {
	if (!startTime) startTime = timestamp;

	const progress = timestamp - startTime;
	if (progress < 500) {
		// 애니메이션 지속 시간 (0.5초)
		const opacity = progress / 500; // 0.5초 동안의 애니메이션
		const translateY = (1 - opacity) * -100;
		$el.style.opacity = opacity;
		$el.style.transform = `translate(0, ${translateY}%)`;
		requestAnimationFrame((timestamp) => fallDown(timestamp, $el, startTime));
		return startTime;
	}

	$el.style.opacity = 1;
	$el.style.transform = `translate(0)`;
	return startTime;
}

function startAnimation($el) {
	let startTime;
	requestAnimationFrame((timestamp) => {
		startTime = fallDown(timestamp, $el, startTime);
	});
}

export default startAnimation;
