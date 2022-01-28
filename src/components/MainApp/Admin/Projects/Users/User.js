import {dateFormatter} from '../../../../Helpers/constants';

const Project = ({user, HideTableCell, MaterialTableCell, MaterialTableRow, MaterialTypography}) => {
  return (
    <>
      <MaterialTableRow>
        <MaterialTableCell>
          <MaterialTypography>
            { user?.username }
          </MaterialTypography>
        </MaterialTableCell>
        <HideTableCell>
          <MaterialTypography>
            { user?.first_name }
          </MaterialTypography>
        </HideTableCell>
        <HideTableCell>
          <MaterialTypography>
            { user?.last_name }
          </MaterialTypography>
        </HideTableCell>
        <HideTableCell>
          <MaterialTypography>
            { user?.email }
          </MaterialTypography>
        </HideTableCell>
        <HideTableCell>
          <MaterialTypography>
            { dateFormatter.format(Date.parse(user?.created_at)) }
          </MaterialTypography>
        </HideTableCell>
        <HideTableCell>
          <MaterialTypography>
            { dateFormatter.format(Date.parse(user?.updated_at)) }
          </MaterialTypography>
        </HideTableCell>
      </MaterialTableRow>
    </>
  );
};

export default Project;
