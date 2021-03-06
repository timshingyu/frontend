export function buildTime(build) {
  const { state, startedAt, canceledAt, finishedAt, scheduledAt } = build;
  const buildTime = {};

  switch (state) {
    case 'canceling':
    case 'failed':
    case 'passed':
    case 'running':
    case 'started':
    case 'blocked':
    case 'canceled':
      buildTime.from = startedAt || scheduledAt;
      break;

    case 'scheduled':
      buildTime.from = scheduledAt;
      break;
  }

  switch (state) {
    case 'failed':
    case 'passed':
      buildTime.to = finishedAt;
      break;

    case 'blocked':
      if (!buildTime.from) {
        break;
      }

      buildTime.to = finishedAt;
      break;

    case 'canceled':
      if (!buildTime.from) {
        break;
      }

      buildTime.to = canceledAt;
      break;
  }

  return buildTime;
}

export function buildStatus(build) {
  const { state, createdAt, canceledAt, finishedAt } = build;

  if (state === 'scheduled') {
    return {
      prefix: 'Scheduled',
      timeValue: createdAt
    };
  } else if (state === 'failed') {
    return {
      prefix: 'Failed',
      timeValue: finishedAt
    };
  } else if (state === 'passed') {
    return {
      prefix: 'Passed',
      timeValue: finishedAt
    };
  } else if (state === 'blocked') {
    return {
      prefix: 'Blocked',
      timeValue: finishedAt
    };
  } else if (state === 'canceled' || state === 'canceling') {
    return {
      prefix: 'Canceled',
      timeValue: canceledAt
    };
  } else if (state === 'skipped') {
    return {
      prefix: 'Skipped',
      timeValue: createdAt
    };
  }

  return {
    prefix: 'Created',
    timeValue: createdAt
  };
}
