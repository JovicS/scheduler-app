import React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useTranslation } from 'react-i18next';

export default function BreadcrumbComponent({className, title}) {
  const {t} = useTranslation();
  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb" className={className}>
        <Link underline="hover" color="inherit" href='/'>
          {t("Calendar")}
        </Link>
        <Typography color="text.primary">{title}</Typography>
      </Breadcrumbs>
    </div>
  );
}